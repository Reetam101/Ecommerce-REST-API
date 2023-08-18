const Cart = require('../models/cartModel');
const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')

const placeOrder = asyncHandler(async (req, res) => {
  const userCart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!userCart) {
    res.status(404)
    throw new Error('Cart not found')
  }

  const orderProducts = userCart.products.map(cartProduct => ({
    product: cartProduct.product._id,
    quantity: cartProduct.quantity,
  }));

  const newOrder = new Order({
    user: req.user._id,
    products: orderProducts,
  });

  await newOrder.save();
  await Cart.deleteOne({ user: req.user._id });

  return res.status(201).json({ message: 'Order placed successfully' });
})

const getOrderHistory = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('products.product').populate('user', '-password').lean()
  if (!orders || orders === []) {
    res.status(200)
    throw new Error("No orders found")
  }

  return res.status(200).json({ orders })
})

const getOrderDetails = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  const order = await Order.findById(orderId).populate('products.product').populate('user', '-password').lean()

  if (!order) {
    res.status(404)
    throw new Error("No order found")
  }

  return res.status(200).json({
    order
  })
})

module.exports = { placeOrder, getOrderDetails, getOrderHistory }