const db = require('../models')
const task_model = db.task
const { validationResult } = require('express-validator')


async function patchTask(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
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
        if (affectedCount == 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json({ message: 'Task updated successfully', task: updatedTasks[0] });
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { patchTask }