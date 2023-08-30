const express = require('express');
const route = express.Router();
const Razorpay = require('razorpay');
const { loggedIn } = require('../middlewares');
const Order = require('../modules/order');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} = process.env;



route.post('/order', loggedIn, async (req,res)=>{
    
    const instance = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET })

    const { amount } = req.body;

    const options = {
        amount: parseInt(amount) * 100,  // amount in the smallest currency unit
        currency: "INR"
    };

    const order = await instance.orders.create(options);

    await Order.create({
        _id:order.id,
        user: req.user._id,
        amount
    })
    // console.log(order);
   
    res.json({
        success: true,
        order
    })

})

route.post('/payment-verify', async (req,res)=>{
    // res.send('hello from payment-varify route');
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const isvalid = validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, RAZORPAY_KEY_SECRET);

    if(isvalid){

        await Order.findByIdAndUpdate({_id:razorpay_order_id}, {paymentstatus:true});

        res.json({ success: true, msg:'Paymment successfull' });
    }
    else{
        res.json({ success: false, msg:'Not a valid payment' });
    }

})


module.exports = route;
