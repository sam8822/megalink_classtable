const express = require('express')
const router = express.Router()
const Member = require('../../models/member')

// Get all subscribers
router.get('/', async (req, res) => {
    try {
        const member = await Member.find()
        res.json(member)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one subscriber
router.get('/:id', getMember, (req, res) => {
    res.json(res.member)
})

// Create one subscriber
router.post('/', async (req, res) => {
    const member = new Member({
        account: req.body.account,
        password: req.body.password,
        moodlepwd: req.body.moodlepwd,
        familyname: req.body.familyname,
        firstname: req.body.firstname,
        studentid: req.body.studentid,
        course: req.body.course,
        email: req.body.email,
        group: req.body.group,
        school: req.body.school
    })

    try {
        const newMember = await member.save()
        res.status(201).json(newMember)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getMember, async (req, res) => {
    if (req.body.account != null) {
        res.member.account = req.body.account
    }
    if (req.body.password != null) {
        res.member.password = req.body.password
    }
    if (req.body.moodlepwd != null) {
        res.member.moodlepwd = req.body.moodlepwd
    }
    if (req.body.familyname != null) {
        res.member.familyname = req.body.familyname
    }
    if (req.body.firstname != null) {
        res.member.firstname = req.body.firstname
    }
    if (req.body.studentid != null) {
        res.member.studentid = req.body.studentid
    }
    if (req.body.email != null) {
        res.member.email = req.body.email
    }
    if (req.body.school != null) {
        res.member.school = req.body.school
    }
    if (req.body.course != null) {
        a = res.member.course
        a.push(req.body.course)
        res.member.course = a
    }
    if (req.body.group != null) {
        a = res.member.group
        a.push(req.body.group)
        res.member.group = a
    }
    // push course group information
    // findOneAndUpdate({new:true}) use new:true this function cant work
    // if (req.body.group != null) {
    //     Member.findOneAndUpdate({ account: req.body.account }, { $addToSet: { 'group': req.body.group } }, function (err, doc) {
    //         if (err) {
    //             console.log("Something wrong when updating data!");
    //         }
    //         console.log(doc)
    //     })
    // }
    try {
        const updatedMember = await res.member.save()
        res.json(updatedMember)
    } catch {
        res.status(400).json({ message: err.message })
    }
})

// Delete one subscriber
router.delete('/:id', getMember, async (req, res) => {
    try {
        await res.member.remove()
        res.json({ message: 'Deleted This Subscriber' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getMember(req, res, next) {
    try {
        member = await Member.findById(req.params.id)
        if (member == null) {
            return res.status(404).json({ message: 'Cant find member' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.member = member
    next()
}

module.exports = router

