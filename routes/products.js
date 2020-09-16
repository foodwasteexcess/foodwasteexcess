const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');


router.get("/product/edit", (req, res, next) => {
  res.render("products/edit-product");
});

router.get("/products-overview", (req, res) => {
  Product.find()
     .then(product => {
      console.log(product)
      res.render("products/products-overview", {product: product})
     })
     .catch(err => {
       next(err);
     });
 });


router.get("/products-overview", (req, res) => {
 Product.find()
    .then(product => {
     console.log(product)
     res.render("products/products-overview", {product: product})
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;