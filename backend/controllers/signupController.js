const db = require('../models');
const { validationResult } = require('express-validator')
async function createUser(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body;
        const userExist = await db.user.findOne({
            where: {
                email: email,
            }
        })
        if (userExist)
            return res.status(409).json({ message: "user already exists" })

        await db.user.create({ name: name, email: email, password: password });
        res.status(201).json({ message: "User created successfully" });
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}


module.exports = { createUser }