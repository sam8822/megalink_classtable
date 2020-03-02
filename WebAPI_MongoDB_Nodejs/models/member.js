const mongoose = require('mongoose')
const memberSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    moodlepwd: {
        type: String
    },
    familyname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    studentid: {
        type: String
    },
    createtime: {
        type: Date,
        required: true,
        default: Date.now
    },
    course: {
        type: [String]
    },
    email: {
        type: String
    },
    group: {
        type: [String]
    },
    school: {
        type: String
    }
})
// exporting our subscriber schema
module.exports = mongoose.model('member', memberSchema)