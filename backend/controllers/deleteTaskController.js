const db = require('../models')
const task_model = db.task
const { validationResult } = require('express-validator')
const logger = require('../config/logger')
async function deleteTask(req, res) {
    const childLogger = logger.child({
        user_id: req.user.user_id,
        task_id: req.params.task_id
    })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            childLogger.warn('Validation failed', { validationErrors: errors.array() })
            return res.status(400).json({ errors: errors.array() })
        }

        const deleted = await task_model.destroy({
            where: {
                user_id: req.user.user_id,
                task_id: req.params.task_id
            }
        })
        if (deleted === 0) {
            childLogger.warn('Task not found')
            return res.status(404).json({ message: "Task not found" });
        }
        childLogger.info('Task deleted')
        return res.sendStatus(204)


    } catch (error) {
        childLogger.error('Server error', { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = { deleteTask }