const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: String,
  password: String,
  firstName: {
    type: String, 
    required: true,
  },
  lastName: {
    type: String, 
    required: true,
  },
  imgName:{
    type: String, 
    required: true,
  },
  imgPath: {
    type: String, 
    required: true,
  },
  imgPublicId: {
    type: String, 
    required: true,
  },
  

});

const User = mongoose.model('User', userSchema);
module.exports = User;
