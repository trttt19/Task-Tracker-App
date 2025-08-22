const jwt = require('jsonwebtoken')
const env = require('../config/env')
const logger = require('../config/logger')
function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null || authHeader.split(' ')[0] != "Bearer") {
        logger.warn('Invalid token format')
        return res.status(401).json({ message: "Invalid token format" })
    }
    jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                logger.warn(' Expired Token')
            }
            else
                logger.warn('Invalid Token')
            return res.status(401).json({ message: "Invalid or Expired Token" })
        }
        req.user = user
        next()
    })
}
module.exports = { authToken }