const { body } = require('express-validator')
const loginValidation = [
    body("email").notEmpty().withMessage('Email is required'),
    body("password").notEmpty().withMessage('Password is required'),

]
module.exports = { loginValidation }