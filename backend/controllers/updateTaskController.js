const db = require('../models')
const task_model = db.task
const { validationResult } = require('express-validator')
const logger = require('../config/logger')

async function patchTask(req, res) {
    const childLogger = logger.child({
        user_id: req.user.user_id,
        task_id: req.params.task_id
    })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            childLogger.warn('Validation failed', { ValidationErrors: errors.array() })
            return res.status(400).json({ errors: errors.array() })
        }
        const updates = req.body
        const [affectedCount, updatedTasks] = await task_model.update(
            updates,
            {
                where: { user_id: req.user.user_id, task_id: req.params.task_id },
                returning: true
            }
        )
        if (affectedCount === 0) {
            childLogger.warn('Task not found')
            return res.status(404).json({ message: 'Task not found' });
        }
        childLogger.info('Task updated')
        return res.status(200).json({ message: 'Task updated successfully', task: updatedTasks[0] });

    } catch (error) {
        childLogger.error('Server error', { error: error.message, stack: error.stack })
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { patchTask }