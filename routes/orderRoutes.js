const express = require('express')
const router = express.Router()
const { placeOrder, getOrderDetails, getOrderHistory } = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')

router.route("/place-order").post(protect, placeOrder)
router.route('/history').get(protect, getOrderHistory)
router.route("/:orderId").get(protect, getOrderDetails)


module.exports = router