const db = require('../models')
const task_model = db.task
const { validationResult } = require('express-validator')
async function deleteTask(req, res) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() })
        const deleted = await task_model.destroy({
            where: {
                user_id: req.user.user_id,
                task_id: req.params.task_id
            }
        })
        if (deleted === 0)
            return res.status(404).json({ message: "Task not found" });
        return res.sendStatus(204)

        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
module.exports = { deleteTask }