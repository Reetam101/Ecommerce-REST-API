const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const mongoose = require('mongoose')
const Category = require('../models/categoryModel')

const getAllProducts = asyncHandler(async (req, res) => {
  const { categoryId } = req.params
  const category = await Category.findById(categoryId)
  console.log(category)
  if (!category) {
    res.status(404)
    throw new Error('Category not found')
  }
  const products = await Product.find({ category: categoryId }).populate('category').lean()
  if (products) {
    return res.status(200).json({ products: products, success: true })
  } else {
    res.status(400)
    throw new Error('No products found')
  }
})

const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params

  const product = await Product.findById(productId).populate('category').lean()
  if (product) {
    return res.status(200).json({ product: product, success: true })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// testing purpose
const addProduct = asyncHandler(async (req, res) => {
  const { name, desc, price } = req.body;
  const newProduct = await Product.create({
    name,
    desc,
    price
  })
  if (newProduct) {
    return res.status(201).json(newProduct)
  } else {
    res.status(400)
    throw new Error('Invalid product data')
  }
})

module.exports = { getAllProducts, getSingleProduct, addProduct }