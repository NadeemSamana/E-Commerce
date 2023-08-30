const express = require('express');
const product = require('../modules/product');
const Review = require('../modules/review');
const { validateProduct, loggedIn, isSeller, isProductAuthor } = require('../middlewares');
const { showallproducts, productform, createproduct, showproduct, producteditform, productupdateform, productdelete } = require('../controllers/products');
const route = express.Router();


// route.route('/products')
//     .get(showallproducts)
//     .post(loggedIn, isSeller, validateProduct, createproduct)


// route.route('/products/new')
//     .get(loggedIn, isSeller, productform)


// route.route('/products/:id')
//     .get(showproduct)
//     .patch(loggedIn, isSeller, isProductAuthor, validateProduct, productupdateform)
//     .delete(loggedIn, isSeller, isProductAuthor, productdelete)


// route.route('/products/:id/edit')
//     .get(loggedIn, isSeller, isProductAuthor, producteditform)


route.route('/')
    .get(showallproducts)
    .post(loggedIn, isSeller, validateProduct, createproduct)


route.route('/new')
    .get(loggedIn, isSeller, productform)


route.route('/:id')
    .get(showproduct)
    .patch(loggedIn, isSeller, isProductAuthor, validateProduct, productupdateform)
    .delete(loggedIn, isSeller, isProductAuthor, productdelete)


route.route('/:id/edit')
    .get(loggedIn, isSeller, isProductAuthor, producteditform)


// route.get('/products', showallproducts )

// route.get('/products/new', loggedIn, isSeller, productform)

// route.post('/products', loggedIn, isSeller, validateProduct, createproduct)

// route.get('/products/:id', showproduct)

// route.get('/products/:id/edit', loggedIn, isSeller, isProductAuthor, producteditform)

// route.patch('/products/:id', loggedIn, isSeller, isProductAuthor, validateProduct, productupdateform)

// route.delete('/products/:id', loggedIn, isSeller, isProductAuthor, productdelete)


module.exports = route;


