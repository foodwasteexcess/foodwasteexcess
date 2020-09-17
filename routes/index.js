const express = require("express");
const { loginCheck } = require("./middlewares");
const router = express.Router();
const Product = require("../models/Product");
const { uploader, cloudinary } = require("../config/cloudinary");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//loginCheck(), added 
router.get('/add-products',loginCheck(),(req, res, next) => {
  //console.log('this is whatever' , req)
  res.render('products/add-product.hbs');
});

router.get('/product-details/:id', (req, res, next) => {
  //console.log('this is whatever')
  if (!req.session.user){
    res.redirect("/login")
  } else {
  Product.findById(req.params.id).then((product)=>{
    console.log("this is what i pass to product details product", product.ownerid.toString())
    console.log("this is what i pass to product details user",req.session.user._id,req.session.user._id === product.ownerid.toString())
    res.render('products/product-details', {product: product, userid:req.session.user._id, ownercheck:product.ownerid.toString()===req.session.user._id});
  })
  .catch(error => next(error))
}
});

// add product

router.post("/add-products", loginCheck(), uploader.single("image"), (req, res, next) => {
//console.log("this is req.body yoooo", req.body.category)
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
        ownerid: req.session.user._id,
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
  console.log('This is the req.body', req.body)
  res.render('dashboard', { user: req.session.user });
});

router.get('/rawdata', (req,res,next)=> {
  Product.find()
  .then((product)=> {
    res.json(product)
  })
  .catch((error)=> next(error))
})


module.exports = router;
