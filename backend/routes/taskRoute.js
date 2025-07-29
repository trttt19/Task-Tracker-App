const express = require('express')
const router = express.Router()



const updateController = require('../controllers/updateTaskController')
const taskValidation = require('../validators/taskValidators')





router.patch('/:task_id', taskValidation.patchValidator, updateController.patchTask)

module.exports = router
