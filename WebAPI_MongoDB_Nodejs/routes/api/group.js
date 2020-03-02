const express = require('express')
const router = express.Router()
const Group = require('../../models/group')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const group = await Group.find()
        res.json(group)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getGroup, (req, res) => {
    res.json(res.course)
})

// Create one subscriber
router.post('/', async (req, res) => {
    const group = new Group({
        name:req.body.name,
        message:req.body.message,
        important:req.body.important,
        task:req.body.task,
        document:req.body.document,
        course:req.body.course,
        member:req.body.member,
        description:req.body.description
    })

    try {
        const newGroup = await group.save()
        res.status(201).json(newGroup)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getGroup, async (req, res) => {
    if (req.body.name != null) {
        res.group.naem = req.body.name
    }
    if(req.body.course!=null){
        res.group.course=req.body.course
    }
    if(req.body.description!=null){
        res.group.description=req.body.description
    }
    if (req.body.message != null) {
        a = res.group.message
        a.push(req.body.message)
        res.group.message = a
    }
    if (req.body.important != null) {
        a = res.group.important
        a.push(req.body.important)
        res.group.important = a
    }
    if (req.body.task != null) {
        a = res.group.task
        a.push(req.body.task)
        res.group.task = a
    }
    if (req.body.document != null) {
        a = res.group.document
        a.push(req.body.document)
        res.group.document = a
    }
    if (req.body.member != null) {
        a = res.group.member
        a.push(req.body.member)
        res.group.member = a
    }
    try {
        const updatedGroup = await res.group.save()
        res.json(updatedGroup)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getGroup, async (req, res) => {
    try {
        await res.group.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getGroup(req, res, next) {
    try {
        group = await Group.findById(req.params.id)
        if (group == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.group = group
    next()
}

module.exports = router

