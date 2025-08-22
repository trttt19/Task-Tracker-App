const env = require('./env')
const winston = require('winston')
const path = require('path')
const { printf, errors, combine, timestamp } = winston.format
const orderedJson = printf(({ level, message, timestamp, ...meta }) => {
    const logObject = {
        level,
        message,
        timestamp,
        ...meta
    };
    return JSON.stringify(logObject);
});

const logger = winston.createLogger({
    level: env.LOG_LEVEL,
    format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        orderedJson
        // json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: path.join(__dirname, '../logs', 'combined.log') }),
        new winston.transports.File({ filename: path.join(__dirname, '../logs', 'error.log'), level: 'error' })
    ]
})
module.exports = logger