const jwt = require('jsonwebtoken')

const generateAccessToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  })

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 15 * 60 * 60 * 1000
  })
}

const generateRefreshToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '5d'
  })

  res.cookie('refresh_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 5 * 24 * 60 * 60 * 1000
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}