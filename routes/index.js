const express = require('express');
const { loginCheck } = require('./middlewares');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});



//loginCheck(), add this later

router.get('/add-products', (req, res, next) => {
  console.log('this is whatever' , req)
  res.render('products/add-product.hbs');
});


router.get('/dashboard',loginCheck(), (req, res, next) => {
  console.log('this is the user: ', req.session.user);
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;
