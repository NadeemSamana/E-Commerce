const {productSchema, reviewSchema} = require('../E-Commerce-V9/schemas');
const product = require('./modules/product');


module.exports.loggedIn = (req,res,next)=>{

    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({
            success: false,
            msg:'Please login first'
        })
    }

    if(!req.isAuthenticated()){
        req.flash('reject', 'log-in first');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateProduct = (req, res, next)=>{
    const {name, img, price, desc} = req.body;
    const {error} = productSchema.validate({name, img, price, desc});

    // console.log(error.details[0].message);
    if(error){
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('products/error', { err: msg });
    }
    next();
}

module.exports.validateReviews = (req, res, next)=>{
    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});

    // console.log(error.details[0].message);
    if(error){
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('products/error', { err: msg });
    }
    next();
}

module.exports.isSeller = (req, res, next)=>{
    if(req.user.role === 'buyer'){
        req.flash('reject', 'you are not authorise');
        return res.redirect('back');
    }

    next();
}

module.exports.isProductAuthor = async (req, res, next)=>{
    const {id} = req.params;
    const Product = await product.findById(id);

    if(!Product.author || !Product.author.equals(req.user.id)){
        req.flash('reject', 'you are not authorise');
        return res.redirect('back');
    }

    next();
}


