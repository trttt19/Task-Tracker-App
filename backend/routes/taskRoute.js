const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const readController = require('../controllers/readTaskController')
const updateController = require('../controllers/updateTaskController')
const deleteController = require('../controllers/deleteTaskController')

const taskValidation = require('../validators/taskValidators')

router.post('/', taskValidation.createValidator, taskController.createTask)
router.get('/', taskValidation.allTasksValidation, readController.getAllTasks)
router.get('/:task_id', taskValidation.taskValidation, readController.getTask)
router.patch('/:task_id', taskValidation.patchValidator, updateController.patchTask)
router.delete('/:task_id', taskValidation.taskValidation, deleteController.deleteTask)

module.exports = router