const env = require('../config/env')
const db = require('../models')
const user_model = db.user
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const logger = require('../config/logger')
async function loginUser(req, res) {
    const childLogger = logger.child({ email: req.body.email })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            childLogger.warn('Validation failed', { ValidationErrors: errors.array() })
            return res.status(400).json({ errors: errors.array() })
        }
        const { email, password } = req.body
        const user = await user_model.findOne({
            where: { email: email }
        })
        if (user == null) {
            childLogger.warn('Email does not exist')
            return res.status(401).json({ message: "Invalid credentials" })
        }


        const match = await bcrypt.compare(password, user.password)
        if (match == false) {
            childLogger.warn('Incorrect password', { user_id: user.user_id })
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const user_info = { user_id: user.user_id, email: user.email, name: user.name }
        const accessToken = jwt.sign(user_info, env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
        childLogger.info('Login successful', { user_id: user.user_id })
        return res.json({ accessToken: accessToken, name: user.name, email: user.email })
    }
    catch (error) {
        childLogger.error('Server error', { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Server error" });
    }

}

module.exports = { loginUser }