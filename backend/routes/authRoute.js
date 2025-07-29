const express = require('express')
const loginController = require('../controllers/loginController.js')
const router = express.Router()
router.post('/login', loginController.loginUser)
const signupController = require('../controllers/signupController')
const { signupValidation } = require('../validators/userValidator')
router.post('/signup', signupValidation, signupController.createUser)

module.exports = router