const Task = require('../models/Task')

const TaskController = { 
    async create (req, res) {
    try{
        const task = await Task.create({...req.body, completed: false})
        res.status(201).json(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to create a task'})
    } 
    },
    async getAll (req,res) {
    try {
        const tasks = await Task.find({})
        res.json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem getting tasks'})
    }
    },
    async getByID (req,res) {
        try {
            const task = await Task.findById(req.params._id)
            res.json(task)
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'There was a problem getting task by id'})
        }
    },
    async markAsCompleted (req,res) {
        try {
            const idTask = req.params._id
            await Task.updateOne({_id: idTask}, {completed: true})
            const task = await Task.findById(idTask).exec()
            res.json(task)
        /*
        const taskId = req.params._id
        const task = await Task.findByIdAndUpdate(
        taskId, {completed : true},{new:true})
        */
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'There was a problem updating task'})
        }
    },
    async updateById (req,res) {
        try {
            const idTask = req.params._id
            await Task.updateOne({_id: idTask}, {title: req.body.title})
            const task = await Task.findById(idTask).exec()
            res.json(task)
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'There was a problem updating task'})
        }
    },
    async delete (req,res) {
        try {
            const idTask = req.params._id
            const task = await Task.findByIdAndDelete(idTask)
            res.status(201).send(`tarea eliminada : ${task}`)
        } catch (error) {
            console.error(error)
            res.status(500).send({message: 'There was a problem delete a task'})
        }
    }
}

module.exports = TaskController