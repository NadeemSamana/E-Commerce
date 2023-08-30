const mongoose = require('mongoose');
const Review = require('./review');

const productschema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true,
        default:'../images/product.jpg'
    },
    price:{
        type:Number,
        min:0,
        default:0
    },
    desc:{
        type:String,
        trim:true
    },
    avgRating:{
        type:Number,
        default:0
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

productschema.post('findOneAndDelete', async (product)=>{
    console.log(product);

    if(product.reviews.length > 0){
        await Review.deleteMany({id: {$in: product.reviews}});
    }

})


const product = mongoose.model('product', productschema);

module.exports = product;



