//const signup = require("../routes/auth");
const db = require('../models');
const bcrypt = require('bcrypt')
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "Missing parameters" })
        if (!validateEmail(email))
            return res.status(400).json({ message: "Invalid email format" })
        const userExist = await db.user.findOne({
            where: {
                email: email,
            }
        })
        if (userExist)
            return res.status(409).json({ message: "user already exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.user.create({ name: name, email: email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully" });
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}


module.exports = { createUser }