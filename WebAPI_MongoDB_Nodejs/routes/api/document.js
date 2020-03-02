const express = require('express')
const router = express.Router()
const Document = require('../../models/document')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const document = await Document.find()
        res.json(document)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getDocument, (req, res) => {
    res.json(res.task)
})

// Create one subscriber
router.post('/', async (req, res) => {
    const document = new Document({
        name:req.body.name,
        member:req.body.member
    })

    try {
        const newDocument = await document.save()
        res.status(201).json(newDocument)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getDocument, async (req, res) => {
    if (req.body.name != null) {
        res.document.name = req.body.name
    }
    if (req.body.member != null) {
        res.document.member = req.body.member
    }
    try {
        const updatedDocument = await res.document.save()
        res.json(updatedDocument)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getDocument, async (req, res) => {
    try {
        await res.document.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getDocument(req, res, next) {
    try {
        document = await Document.findById(req.params.id)
        if (document == null) {
            return res.status(404).json({ message: 'Cant find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.document = document
    next()
}

module.exports = router

