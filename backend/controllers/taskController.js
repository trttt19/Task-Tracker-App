const db = require('../models')
const task_model = db.task

async function createTask(req, res) {
    try {
        const { user, title, description, due_date, status, priority } = req.body;
        const user_id = user.user_id
        //const user_id = req.user.user_id
        if (!title)
            return res.status(400).json({ message: "missing title" })

        const task = await task_model.create({ user_id, title, description, due_date, status, priority })
        return res.status(201).json({ task_id: task.task_id, title: task.title, descrption: task.description, priority: task.priority, status: task.status, due_date: task.due_date, createdAt: task.createdAt })

        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = { createTask }