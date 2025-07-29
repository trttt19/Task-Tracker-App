
const priorities = ["low", "medium", "high"]
const status = ["toDo", "inProgress", "done"]





















const { body, checkExact } = require('express-validator')
const patchValidator = checkExact([
    body("due_date").optional().isISO8601().withMessage('Due date must be a valid date (ISO8601)').toDate(),
    body("priority").optional().isIn(priorities).withMessage("must be either low, medium or high"),
    body("status").optional().isIn(status).withMessage("must be either toDo, inProgress or done"),
    body("title").optional().isString().withMessage('Title must be text').isLength({ max: 100 }).withMessage('Title must be under 100 characters'),
    body("description").optional().isString().withMessage('Description must be text'),
    body("logged_time").optional().isNumeric().withMessage("Logged time must be a number"),
    body("estimated_time").optional().isNumeric().withMessage("Estimated time must be a number"),
])
module.exports = { patchValidator }