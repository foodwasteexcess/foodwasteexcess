const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');


router.get("/product/edit", (req, res, next) => {
  res.render("products/edit-product");
});


module.exports = router;