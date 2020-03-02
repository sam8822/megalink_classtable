const express = require('express')
const router = express.Router()
const Course = require('../../models/course')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const course = await Course.find()
        res.json(course)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getCourse, (req, res) => {
    res.json(res.course)
})

// Create one subscriber
router.post('/', async (req, res) => {
    const course = new Course({
        id: req.body.id,
        title: req.body.title,
        credits: req.body.credits,
        requirelective: req.body.requirelective,
        fullhalf: req.body.fullhalf,
        teacher: req.body.teacher,
        total: req.body.total,
        daytime: req.body.daytime,
        location: req.body.location,
        notes: req.body.notes,
        outline: req.body.outline
    })

    try {
        const newCourse = await course.save()
        res.status(201).json(newCourse)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getCourse, async (req, res) => {
    if (req.body.id != null) {
        res.course.id = req.body.id
    }
    if (req.body.title != null) {
        res.course.title = req.body.title
    }
    if (req.body.credits != null) {
        res.course.credits = req.body.credits
    }
    if (req.body.requirelective != null) {
        res.course.requirelective = req.body.requirelective
    }
    if (req.body.fullhalf != null) {
        res.course.fullhalf = req.body.fullhalf
    }
    if (req.body.teacher != null) {
        res.course.teacher = req.body.teacher
    }
    if (req.body.total != null) {
        res.course.total = req.body.total
    }
    if (req.body.daytime != null) {
        res.course.daytime = req.body.daytime
    }
    if (req.body.location != null) {
        res.course.location = req.body.location
    }
    if (req.body.notes != null) {
        res.course.notes = req.body.notes
    }
    if (req.body.outline != null) {
        res.course.outline = req.body.outline
    }
    try {
        const updatedCourse = await res.course.save()
        res.json(updatedCourse)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getCourse, async (req, res) => {
    try {
        console.log(res.course)
        console.log(res.course[0]['_id'])
        await res.course.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getCourse(req, res, next) {
    try {
        course = await Course.find({id:req.params.id})
        console.log(course)
        if (course == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.course = course
    next()
}

module.exports = router

