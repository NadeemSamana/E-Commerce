const express = require('express');
const route = express.Router();
const {loggedIn} = require('../middlewares');
const User = require('../modules/user');


route.post('/products/:productid/like', loggedIn, async (req,res)=>{
    const {productid} = req.params;
    const user = req.user;
    const islike = req.user.wishlist.includes(productid);

    if(islike){
        await User.findByIdAndUpdate(user.id, {$pull: {wishlist: productid}}, {new: true});
    }
    else{
        await User.findByIdAndUpdate(user.id, {$addToSet: {wishlist: productid}}, {new: true});
    }

    res.json({
        success:true
    })
})



module.exports = route;

