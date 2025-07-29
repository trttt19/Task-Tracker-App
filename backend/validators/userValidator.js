const { body } = require('express-validator')
const loginValidation = [
    body("email").notEmpty().withMessage('Email is required'),
    body("password").notEmpty().withMessage('Password is required'),

]

const signupValidation = [
    body("name").notEmpty().withMessage('Name is required'),
    body("email").isEmail().withMessage('Invalid email format'),
    body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

];
module.exports = { signupValidation, loginValidation }
