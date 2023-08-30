const express = require('express');
const Review = require('../modules/review');
const product = require('../modules/product');
const { validateReviews, loggedIn } = require('../middlewares');
const route = express.Router();


route.post('/products/:productId/review', loggedIn, validateReviews, async (req,res)=>{
  try {
      // console.log(req.body);
      const {productId} = req.params;
  
      const newReview = new Review(req.body);
      await newReview.save();
  
      const Product = await product.findById(productId);
      const newAvgRating = ((Product.avgRating * Product.reviews.length) + parseInt(req.body.rating)) / (Product.reviews.length + 1);
      
      // console.log(Product);
      Product.avgRating = newAvgRating.toFixed(1);
      Product.reviews.push(newReview);
  
      await Product.save();
      await newReview.save();
  
      req.flash('success', 'Added Your Review Successfully');
  
      res.redirect('back');
    }
    catch (e) {
        res.render('products/error', {err: e.message});
    }
})



module.exports = route;

