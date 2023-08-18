const mongoose = require('mongoose')
const Category = require('./categoryModel')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String
  },
  price: {
    type: Number,
    require: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product