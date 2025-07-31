const db = require('../models')
const task_model = db.task
const { validationResult } = require('express-validator')


async function createTask(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const body = req.body
        console.log(body)
        const task = await task_model.create({
            user_id: req.user.user_id,
            ...body
        })
        return res.status(201).json({ task_id: task.task_id, title: task.title, description: task.description, priority: task.priority, status: task.status, due_date: task.due_date, createdAt: task.createdAt })


        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = { createTask }