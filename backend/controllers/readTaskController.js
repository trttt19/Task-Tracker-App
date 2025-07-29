const db = require('../models')
const task_model = db.task
const { Op } = require('sequelize')
const { validationResult } = require('express-validator')
const sortByMap = {
    dueDate: 'due_date',
    title: 'title',
    createdAt: 'createdAt'
};
async function getAllTasks(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const limit_no = parseInt(req.query.limit_by, 10) || 10
        const page = parseInt(req.query.page, 10) || 1
        const offset = (page - 1) * limit_no;
        const user_id = req.user.user_id
        const sort_by = sortByMap[req.query.sort_by] || "due_date"
        const order = req.query.order || "asc"
        const whereConditions = { user_id };

        if (req.query.title) {
            whereConditions.title = { [Op.iLike]: `%${req.query.title}%` };;
        }
        if (req.query.priority) {
            whereConditions.priority = req.query.priority
        }
        if (req.query.status) {
            whereConditions.status = req.query.status
        }
        const tasks = await task_model.findAll({
            where: whereConditions,
            order: [[sort_by, order]],
            limit: limit_no,
            offset: offset
        })
        if (!tasks.length) {
            return res.sendStatus(204)
        }
        return res.status(200).json({ tasks })

        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }


}

async function getTask(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const task = await task_model.findOne({
            where: {
                user_id: req.user.user_id,
                task_id: req.params.task_id
            }
        })
        if (!task)
            return res.status(404).json({ message: "no task exists with this task id" })
        return res.status(200).json({ task })
        // eslint-disable-next-line no-unused-vars
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}


module.exports = { getAllTasks, getTask }