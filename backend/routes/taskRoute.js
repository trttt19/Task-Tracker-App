const express = require('express')
const router = express.Router()
const readController = require('../controllers/readTaskController')
const tasksValidation = require('../validators/taskValidators')
router.get('/', tasksValidation.allTasksValidation, readController.getAllTasks)
router.get('/:task_id', tasksValidation.taskValidation, readController.getTask)










module.exports = router