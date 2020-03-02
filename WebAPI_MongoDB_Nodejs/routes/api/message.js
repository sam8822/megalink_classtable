const express = require('express')
const router = express.Router()
const Message = require('../../models/message')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const message = await Message.find()
        res.json(message)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getMessage, (req, res) => {
    res.json(res.message)
})

// Create one subscriber
router.post('/', async (req, res) => {
    const message = new Message({
        message:req.body.message,
        member:req.body.member,
        important:req.body.important
    })

    try {
        const newMessage = await message.save()
        res.status(201).json(newMessage)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getMessage, async (req, res) => {
    if (req.body.message != null) {
        res.message.message = req.body.message
    }
    if (req.body.member != null) {
        res.message.member = req.body.member
    }
    if(req.body.important != null){
        res.message.important=req.body.important
    }
    try {
        const updatedMessage = await res.message.save()
        res.json(updatedMessage)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getMessage, async (req, res) => {
    try {
        await res.message.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getMessage(req, res, next) {
    try {
        message = await Message.findById(req.params.id)
        if (message == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.message = message
    next()
}

module.exports = router

