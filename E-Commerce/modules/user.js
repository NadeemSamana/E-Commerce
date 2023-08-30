// const { string } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        default:'buyer'
    },
    wishlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ],
    cart:[
        {
            productid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product',
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true
            }
        }
    ]
    // password:{
    //     type:String,
    //     required:true
    // }
})

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;


