const express = require('express')
const { registerUser, authUser, refresh } = require('../controllers/userController')
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(authUser)
router.route("/refresh").get(refresh)

module.exports = router