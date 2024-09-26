const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const taskController = require('../controllers/Taskcontroller')


router.post('/create', taskController.create)

router.get('/', taskController.getAll)

router.get('/id/:_id', taskController.getByID)

router.put('/markAsCompleted/:_id', taskController.markAsCompleted )

router.put('/id/:_id', taskController.updateById)

router.delete('/id/:_id', taskController.delete)

module.exports = router