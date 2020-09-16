const express = require("express");
const { loginCheck } = require("./middlewares");
const router = express.Router();
const Product = require("../models/Product");
const { uploader, cloudinary } = require("../config/cloudinary");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//loginCheck(), add this later to the /add/products

router.get('/add-products', (req, res, next) => {
  //console.log('this is whatever' , req)
  res.render('products/add-product.hbs');
});

router.get('/product-details/:id', (req, res, next) => {
  console.log('this is whatever')
  Product.findById(req.params.id).then((product)=>{
    res.render('products/product-details', {product: product});
  })
  .catch(error => next(error))

});

// add product

router.post("/add-products", uploader.single("image"), (req, res, next) => {
console.log("this is req.body yoooo", req.body.category)
  const { title, brand, expiryDate, description, category} = req.body;
  //console.log('this is image:' ,image)
  //console.log("this is req.file", req)
  const coordinates = req.body.coordinates.split(',')
  const imgName = req.file.originalname;
  const imgPath = req.file.url;
  const imgPublicId = req.file.public_id;

      Product.create({
        title: title,
        brand: brand,
        expiryDate: expiryDate,
        description: description,
        imgName: imgName,
        imgPath: imgPath,
        imgPublicId: imgPublicId,
        location: coordinates,
        category: category,
      }).then((productFromDb) => {
        console.log("this is the product yoo", productFromDb)
        res.redirect(`/product-details/${productFromDb._id}`);
      })
    .catch((error) => {
      console.log(error);
    });
  });

router.get('/dashboard',loginCheck(), (req, res, next) => {
  console.log('this is the user: ', req.session.user);
  res.render('dashboard', { user: req.session.user });
});

router.get('/rawdata', (req,res,nect)=> {
  Product.find()
  .then((product)=> {
    res.json(product)
  })
  .catch((error)=> next(error))
})

module.exports = router;
