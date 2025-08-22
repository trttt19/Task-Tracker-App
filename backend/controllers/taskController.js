const db = require('../models')
const task_model = db.task
const { validationResult } = require('express-validator')
const logger = require('../config/logger')

async function createTask(req, res) {
    const childLogger = logger.child({ user_id: req.user.user_id })
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            childLogger.warn('Validation failed', { ValidationErrors: errors.array() })
            return res.status(400).json({ errors: errors.array() })
        }
        const body = req.body
        const task = await task_model.create({
            user_id: req.user.user_id,
            ...body
        })
        childLogger.info('Task Created', { task_id: task.task_id })
        // return res.status(201).json({ task_id: task.task_id, title: task.title, description: task.description, priority: task.priority, status: task.status, due_date: task.due_date, createdAt: task.createdAt })

        return res.status(201).json(task.get({ plain: true }))


    } catch (error) {
        childLogger.error('Server error', { error: error.message, stack: error.stack })
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = { createTask }