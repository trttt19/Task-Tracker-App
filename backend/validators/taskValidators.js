const { body, query, checkExact, param } = require('express-validator')
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
    param("task_id").isInt().withMessage("task_id must be a integer")
]

const patchValidator = checkExact([
    body("due_date").optional().isISO8601().withMessage('Due date must be a valid date (ISO8601)').toDate(),
    body("priority").optional().isIn(priorities).withMessage("must be either low, medium or high"),
    body("status").optional().isIn(status).withMessage("must be either toDo, inProgress or done"),
    body("title").optional().isString().withMessage('Title must be text').isLength({ max: 100 }).withMessage('Title must be under 100 characters'),
    body("description").optional().isString().withMessage('Description must be text'),
    body("logged_time").optional().isNumeric().withMessage("Logged time must be a number"),
    body("estimated_time").optional().isNumeric().withMessage("Estimated time must be a number"),
])
const createValidator = [
    body("title").notEmpty().withMessage("Title is required").isString().withMessage('Title must be text').isLength({ max: 100 }).withMessage('Title must be under 100 characters'),
    body("description")
        .optional()
        .isString().withMessage("Description must be text")
        .isLength({ max: 500 }).withMessage("Description must be under 500 characters"),

    body("priority")
        .optional()
        .isIn(priorities).withMessage("Priority must be low, medium, or high"),

    body("status")
        .optional()
        .isIn(status).withMessage("Status must be toDo, inProgress, or done"),

    body("due_date")
        .optional()
        .isISO8601().withMessage("Due date must be a valid date")
]
module.exports = { patchValidator, createValidator, allTasksValidation, taskValidation }