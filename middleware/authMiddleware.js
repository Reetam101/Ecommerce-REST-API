const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
  token = req.cookies.access_token

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

      req.user = await User.findById(decoded.userId).select("-password")
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized, invalid access token')

    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no access token')
  }
})

module.exports = protect