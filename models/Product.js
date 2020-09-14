const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fruitsandvegetables', 'alreadycooked', 'condiments', 'dairy', 'meatandfish', 'veggieproducts', 'drygoods', 'backeryproducts']
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
