const express = require('express')
const getAllCategories = require('../controllers/categoryController')
const router = express.Router()

router.route("/all").get(getAllCategories)

module.exports = router