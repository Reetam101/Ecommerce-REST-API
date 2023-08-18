const express = require('express')
const router = express.Router()
const { addToCart, updateQuantities, removeItems, viewCart } = require('../controllers/cartController')
const protect = require('../middleware/authMiddleware')



router.route("/")
  .get(protect, viewCart)
  .post(protect, addToCart)

router.route("/:productId").put(protect, updateQuantities).delete(protect, removeItems)

module.exports = router;