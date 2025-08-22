const express = require('express')
const loginController = require('../controllers/loginController.js')
const router = express.Router()
const { loginValidation } = require('../validators/userValidator.js')
router.post('/login', loginValidation, loginController.loginUser)
const signupController = require('../controllers/signupController')
const { signupValidation } = require('../validators/userValidator')
router.post('/signup', signupValidation, signupController.createUser)

module.exports = router