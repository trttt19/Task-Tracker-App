const express = require('express')
const { signupValidation } = require('../validators/userValidator')
const signupController = require('../controllers/signupController')
const router = express.Router()

router.post('/signup', signupValidation, signupController.createUser)

module.exports = router