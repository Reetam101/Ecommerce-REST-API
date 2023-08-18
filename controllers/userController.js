const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')
const jwt = require('jsonwebtoken')

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPasswords(password))) {
    generateAccessToken(res, user._id)
    generateRefreshToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password
  })

  if (user) {
    generateAccessToken(res, user._id)
    generateRefreshToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies

  if (!cookies.refresh_token) {
    res.status(401)
    throw new Error("Unauthorized")
  }
  const refresh_token = cookies.refresh_token

  jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401)
      throw new Error('Forbidden')
    }
    const user = await User.findById(decoded.userId).exec()
    if (!user) {
      res.status(401)
      throw new Error('Unauthorized user')
    }
    // console.log(user)
    generateAccessToken(res, user._id);
    return res.json({
      "message": "refreshed"
    })
  })
})

module.exports = {
  registerUser,
  authUser,
  refresh
}