const express = require('express')
const router = express.Router()









const tasksValidation = require('../validators/taskValidators')
const deleteController = require('../controllers/deleteTaskController')
router.delete('/:task_id', tasksValidation.taskValidation, deleteController.deleteTask)
module.exports = router