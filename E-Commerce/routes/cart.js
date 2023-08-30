const express = require('express');
const { loggedIn } = require('../middlewares');
const User = require('../modules/user');
const route = express.Router();


route.post('/user/:productid/add', loggedIn, async(req,res)=>{
    const {productid} = req.params;
    const userid = req.user.id;

    const user = await User.findById(userid);

    const cartitem = user.cart.find((item)=>{
        return item.productid.toString() === productid;
    });

    if(cartitem){
        cartitem.quantity++;
    }
    else{
        user.cart.push({productid});
    }

    await user.save();

    req.flash('success', 'Product added successfully');
    res.redirect('back');
})


route.post('/user/:productid/remove', loggedIn, async(req,res)=>{
    const {productid} = req.params;
    const userid = req.user.id;

    const user = await User.findById(userid);

    const cartitem = user.cart.find((item)=>{
        return item.productid.toString() === productid;
    });

    if(cartitem && cartitem.quantity > 1){
        cartitem.quantity--;
    }

    await user.save();

    res.redirect('back');
})


route.delete('/user/:productid/delete', loggedIn, async (req, res)=>{
    const {productid} = req.params;
    const userid = req.user.id;

    const user = await User.findById(userid);

    const itemindex = user.cart.findIndex((item)=>{
        return item.productid.toString() === productid;
    })

    if(itemindex !== -1){
        user.cart.splice(itemindex, 1);
    }

    await user.save();

    res.redirect('back');
})


route.get('/user/cart', loggedIn, async (req,res)=>{
    const userid = req.user.id;
    const user = await User.findById(userid).populate('cart.productid');

    let totalamount = 0;
    user.cart.forEach(item => {
        totalamount += item.quantity * item.productid.price;
    });

    res.render('cart/index', {user, totalamount});
})





module.exports = route;
