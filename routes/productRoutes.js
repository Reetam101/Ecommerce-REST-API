const express = require('express')
const router = express.Router()
const { getAllProducts, getSingleProduct, addProduct } = require('../controllers/productController')



router.route("/:categoryId").get(getAllProducts)
router.route("/singleProduct/:productId").get(getSingleProduct)
router.route("/add").post(addProduct)

module.exports = router;