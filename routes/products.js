const express = require('express');
const router = express.Router();
const {
  loginCheck
} = require("./middlewares");
const Product = require('../models/Product');
const User = require('../models/User');
const {
  uploader,
  cloudinary
} = require("../config/cloudinary");
const {
  findByIdAndUpdate
} = require('../models/User');


//route to edit a product starts here:
//not finished yet!!

router.get('/product/edit/:id', (req, res, next) => {
  //console.log('this is whatever')
  Product.findById(req.params.id)
    .then((product) => {
      res.render('products/edit-product', {
        product: product
      });
    })
    .catch(error => next(error))

});

//, uploader.single("image") add this if you want the user be able to update a picture
router.post("/product/edit/:id", (req, res, next) => {
  //console.log("this is req.body yoooo", req.body.category)
  const { title, brand, expiryDate, description, category} = req.body;
  //console.log('this is image:' ,image)
  //console.log("this is req.file", req)
  // const coordinates = req.body.coordinates.split(',')
  // const imgName = req.file.originalname;
  // const imgPath = req.file.url;
  // const imgPublicId = req.file.public_id;

  Product.findById(req.params.id).then(product => {
    console.log(product)
  })
  Product.findByIdAndUpdate(req.params.id, {
      title: title,
      brand: brand,
      expiryDate: expiryDate,
      description: description,
      // imgName: imgName,
      // imgPath: imgPath,
      // imgPublicId: imgPublicId,
      // location: coordinates,
      category: category,
      ownerid: req.session.user._id
    }, {
      new: true
    }).then((productFromDb) => {
      //console.log("this is the product yoo", productFromDb)
      res.redirect(`/product-details/${productFromDb._id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

//route editting the product finished here


//route for the overview of all the products
router.get("/products-overview", (req, res) => {
  Product.find()
    .then(product => {
      console.log(product)
      res.render("products/products-overview", {
        product: product
      })
    })
    .catch(err => {
      next(err);
    });
});

router.post('/product-details/comments/:id', (req, res, next) => {
  const {
    user,
    comments
  } = req.body;

  Product.findByIdAndUpdate(req.params.id, {
    $push: {
      comments: {
        userid: user,
        commentitself: comments
      }
    }
  }).then(product => {
    res.redirect(`/product-details/${product._id}`)
  }).catch(error => {
    next(error)
  })
});


module.exports = router;