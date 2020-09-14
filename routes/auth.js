const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
//const { uploader, cloudinary } = require('../config/cloudinary.js')

router.get('/signup', (req, res, next) => {
  res.render('./auth/signup');
});

router.get('/login', (req, res, next) => {
  res.render('./auth/login');
});



router.post('/signup', (req, res, next) => {
  //if password is empty or <8 charachter ->
  // show the form again with error message
  const {email, password, firstName, lastName, image} = req.body;
  console.log(email)
  if (password.length < 8) {
    res.render('./auth/signup', {message: 'Your password needs to be 8 characters min'})
    return;
  }
  if (email === '') {
    res.render('./auth/signup', {message: 'Your email cannot be empty'})
    return;
  }
  //check if username exists in database -> show message if it already exists 
User.findOne({email : email })
.then(found => {
  if (found !== null){
    res.render('./auth/signup', {message: 'For this email an account already exists'})
  } else {
  // when the username can be taken, hash the password, create the user and redirect to profile page
const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync(password, salt);

User.create({
email: email,
password: hash,
firstName: firstName ,
lastName: lastName ,
image: image,
})
.then(userFromDb => {
  
  res.render('./auth/login', {user : userFromDb});  
 
})
  }
})
   
});



router.post('/login', (req,res,next)=> {
  const { email, password} = req.body;
  //first username is the field in the user document from the database 
  //second is the username from the input field from the log in form 
  User.findOne({email: email})
  .then(found => {
    if (found === null){
      res.render('./auth/login', {message: 'Invalid credentials'});
      return
    }
    //first password is the userinput - second is the hash from the database
    if (bcrypt.compareSync(password, found.password)){
      // password and the hash match
      req.session.user = found;
      res.redirect('dashboard');
    }else {
      res.render('./auth/login', {message: 'Invalid credentials'});
    }
    })
    .catch(error => {
      next(error);
    })
});

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      next(error);
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;