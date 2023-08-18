const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

const viewCart = asyncHandler(async (req, res) => {
  console.log(req.user)
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'products',
    populate: {
      path: 'product'
    }
  }).populate('user', '-password').lean()
  if (!cart) {
    res.status(404)
    throw new Error("cart is empty")
  }

  return res.status(200).json({ cart })
})

const addToCart = asyncHandler(async (req, res) => {
  try {

    const { productId, quantity } = req.body
    const product = await Product.findById(productId)
    if (!product) {
      res.status(404)
      throw new Error("product not found")
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'products',
      populate: {
        path: 'product'
      }
    }).populate('user', '-password')

    if (!cart) {
      const newCart = new Cart({
        user: req.user._id,
        products: [{ product: productId, quantity }],
      });
      await newCart.save();
    } else {
      const existingProduct = cart.products.find(p => p.product.equals(productId));
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        console.log(productId)
        cart.products.push({ product: productId, quantity });
      }
      // console.log(cart)
      await cart.save();
    }
    return res.status(201).json({
      message: `${product.name} added to cart.`
    })
  } catch (error) {
    res.status(500)
    throw new Error(error)
  }

})

const updateQuantities = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const { quantity } = req.body;

  const userCart = await Cart.findOne({ user: req.user._id });
  if (!userCart) {
    res.status(404)
    throw new Error('Cart not found')
  }

  const cartProduct = userCart.products.find(p => p.product.equals(productId));
  if (!cartProduct) {
    res.status(404)
    throw new Error("Product not found in the cart")
  }
  cartProduct.quantity = quantity;
  if (cartProduct.quantity === 0) {
    userCart.products.pull(cartProduct);
  }
  await userCart.save();

  return res.status(201).json({ message: 'Cart updated successfully' });
})

const removeItems = asyncHandler(async (req, res) => {
  const { productId } = req.params
  const userCart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'products',
    populate: {
      path: 'product'
    }
  }).populate('user');
  if (!userCart) {
    res.status(404)
    throw new Error('Cart not found')
  }
  const cartProduct = userCart.products.find(p => p.product.equals(productId));
  if (!cartProduct) {
    res.status(404)
    throw new Error("Product not found in the cart")
  }
  userCart.products.pull(cartProduct)
  await userCart.save()

  return res.status(201).json({ message: "Item removed from cart." })
})

module.exports = {
  viewCart,
  addToCart,
  updateQuantities,
  removeItems
}