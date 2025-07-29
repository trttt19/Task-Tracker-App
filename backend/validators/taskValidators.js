const { query } = require('express-validator')
const priorities = ["low", "medium", "high"]
const status = ["toDo", "inProgress", "done"]
const sorting = ["dueDate", "title", "createdAt"]
const orders = ["asc", "desc"]
const allTasksValidation = [
    query("title").optional().isString().withMessage("title must be a string"),
    query("status").optional().isIn(status).withMessage("must be either toDo, inProgress or done"),
    query("priority").optional().isIn(priorities).withMessage("must be either low, medium or high"),
    query("sort_by").optional().isIn(sorting).withMessage("must be either dueDate, name or createdAt"),
    query("order").optional().isIn(orders).withMessage("must be either asc or desc"),
    query("limit_by").optional().isInt({ min: 1 }).withMessage("must be a number"),
    query("page").optional().isInt({ min: 1 }).withMessage("must be a number"),

]

const taskValidation = [
    query("task_id").isUUID().withMessage("task_id must be a UUID")
]
module.exports = { allTasksValidation, taskValidation }