const env = require('../config/env')
const db = require('../models')
const user_model = db.user
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
async function loginUser(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() })
    const { email, password } = req.body
    // if (!email || !password) {
    //     return res.status(400).json({ message: "email and password are required" })
    // }
    const user = await user_model.findOne({
        where: { email: email }
    })
    if (user == null)
        return res.status(401).json({ message: "Invalid credentials" })


    const match = await bcrypt.compare(password, user.password)
    if (match == false) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const user_info = { user_id: user.user_id, email: user.email, name: user.name }
    const accessToken = jwt.sign(user_info, env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
    res.json({ accessToken: accessToken, name: user.name, email: user.email })

}

module.exports = { loginUser }