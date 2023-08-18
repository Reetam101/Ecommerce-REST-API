const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')

const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().lean()
  if (!categories) {
    res.status(400)
    throw new Error("No categories found")
  }

  return res.status(200).json({
    categories
  })
})

module.exports = getAllCategories