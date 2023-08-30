const mongoose = require('mongoose');

const reviewschema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    comment:{
        type: String,
        trim: true,
        required: true
    }
});

const Review = mongoose.model('Review', reviewschema);

module.exports = Review;





