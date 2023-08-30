const mongoose = require('mongoose');


const orderschema = new mongoose.Schema({
    _id:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    amount: Number,
    paymentstatus: {
        type:Boolean,
        default:false
    }
})


const Order = mongoose.model('Order', orderschema);

module.exports = Order;


