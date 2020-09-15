const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  brand: String,

  expiryDate: Date,

  description: {
    type: String,
    required: true
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

  category: {
    type: String,
    required: true,
    enum: ['fruitsandvegetables', 'alreadycooked', 'condiments', 'dairy', 'meatandfish', 'veggieproducts', 'drygoods', 'backeryproducts', 'drinks']
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
