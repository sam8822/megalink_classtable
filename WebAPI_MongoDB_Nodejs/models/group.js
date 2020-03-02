const mongoose = require('mongoose')
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createtime: {
        type: Date,
        required: true,
        default: Date.now
    },
    message: {
        type: [String]
    },
    important: {
        type: [String]
    },
    task: {
        type: [String]
    },
    document: {
        type: [String]
    },
    course: {
        type: String
    },
    member: {
        type: [String]
    },
    description: {
        type: String
    }
})
// exporting our subscriber schema
module.exports = mongoose.model('group', groupSchema)