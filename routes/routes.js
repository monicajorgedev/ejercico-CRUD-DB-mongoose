const express = require('express')
const router = express.Router()
const Task = require('../models/task')


router.post('/create', async(req,res)=> {
    try{
        const task = await Task.create(req.body)
        res.status(201).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to create a task'})
    }
})

router.get('/', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem getting tasks'})
    }
})

router.get('/id/:_id', async(req,res)=> {
    try {
        const idTask = req.params._id
        const task = await Task.findById(idTask).exec()
        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem getting task by id'})
    }
})

router.put('/markAsCompleted/:_id', async (req,res) => {
    try {
        const idTask = req.params._id
        await Task.updateOne({_id: idTask}, {completed: true})
        const task = await Task.findById(idTask).exec()
        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem updating task'})
    }
})

router.put('/id/:_id', async (req,res) => {
    try {
        const idTask = req.params._id
        await Task.updateOne({_id: idTask}, {title: req.body.title})
        const task = await Task.findById(idTask).exec()
        res.json(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem updating task'})
    }
})

router.delete('/id/:_id', async (req,res) => {
    try {
        const idTask = req.params._id
        const task = await Task.findByIdAndDelete(idTask)
        res.status(201).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem delete a task'})
    }
})
module.exports = router