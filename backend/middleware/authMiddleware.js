const jwt = require('jsonwebtoken')
const env = require('../config/env')
function authToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null || authHeader.split(' ')[0] != "Bearer")
        return res.status(401).json({ message: "Invalid token format" })
    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({ message: "Invalid or Expired Token" })
        req.user = user
        next()
    })
}
module.exports = { authToken }