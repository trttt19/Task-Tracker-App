const db = require('../models');
const { validationResult } = require('express-validator')
const logger = require('../config/logger')
async function createUser(req, res) {
    const childLogger = logger.child({ email: req.body.email })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            childLogger.warn('Validation failed', { ValidationErrors: errors.array() })
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body;
        const userExist = await db.user.findOne({
            where: {
                email: email,
            }
        })
        if (userExist) {
            childLogger.warn('User already exists')
            return res.status(409).json({ message: "user already exists" })
        }

        const newUser = await db.user.create({ name: name, email: email, password: password });
        childLogger.info('User created', { user_id: newUser.user_id })
        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        childLogger.error('Server error', { error: error.message, stack: error.stack })
        return res.status(500).json({ message: "Server Error" })
    }
}


module.exports = { createUser }