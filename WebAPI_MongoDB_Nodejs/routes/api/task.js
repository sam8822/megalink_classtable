const express = require('express')
const router = express.Router()
const Task = require('../../models/task')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const task = await Task.find()
        res.json(task)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getTask, (req, res) => {
    res.json(res.task)
})

// Create one subscriber
router.post('/', async (req, res) => {
    const task = new Task({
        title:req.body.title,
        finished:req.body.finished,
        executor:req.body.executor,
        assigner:req.body.assigner,
        startime:req.body.startime,
        endtime:req.body.endtime,
        content:req.body.content
    })

    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.account = req.body.title
    }
    if (req.body.finished != null) {
        res.task.finished = req.body.finished
    }
    if (req.body.startime != null) {
        res.task.startime = req.body.startime
    }
    if (req.body.endtime != null) {
        res.task.endtime = req.body.endtime
    }
    if (req.body.content != null) {
        res.task.content = req.body.content
    }
    if (req.task.executor != null) {
        a = res.task.executor
        a.push(req.body.executor)
        res.task.executor = a
    }
    if (req.task.assigner != null) {
        a = res.task.assigner
        a.push(req.body.assigner)
        res.task.assigner = a
    }
    if (req.task.executor != null) {
        a = res.task.executor
        a.push(req.body.executor)
        res.task.executor = a
    }
    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTask(req, res, next) {
    try {
        task = await Task.findById(req.params.id)
        if (task == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.task = task
    next()
}

module.exports = router

