const express = require('express')
const router = express.Router()
const Customizething = require('../../models/customizething')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const customizething = await Customizething.find()
        res.json(customizething)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getCustomizething, async (req, res) => {
    res.json(res.customizething)
})

// Create one subscriber
router.post('/', async (req, res) => {
    const customizething = new Customizething({
        name: req.body.name,
        content: req.body.content,
        location: req.body.location,
        startime: req.body.startime,
        endtime: req.body.endtime,
        fixed: req.body.fixed,
        member: req.body.member
    })

    try {
        const newCustomizething = await customizething.save()
        res.status(201).json(newCustomizething)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getCustomizething, async (req, res) => {
    if (req.body.name != null) {
        res.customizething.name = req.body.name
    }
    if (req.body.content != null) {
        res.customizething.content = req.body.content
    }
    if (req.body.location != null) {
        res.customizething.location = req.body.location
    }
    if (req.body.startime != null) {
        res.customizething.startime = req.body.startime
    }
    if (req.body.endtime != null) {
        res.customizething.endtime = req.body.endtime
    }
    if (req.body.fixed != null) {
        res.customizething.fixed = req.body.fixed
    }
    if (req.body.member != null) {
        res.customizething.member = req.body.member
    }
    try {
        const updatedCustomizething = await res.customizething.save()
        res.json(updatedCustomizething)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getCustomizething, async (req, res) => {
    try {
        await res.customizething.remove()
        res.json({ message: 'Deleted This customizething' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getCustomizething(req, res, next) {
    try {
        customizething = await Customizething.findById(req.params.id)
        if (customizething == null) {
            return res.status(404).json({ message: 'Cant find customizething' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.customizething = customizething
    next()
}

module.exports = router

