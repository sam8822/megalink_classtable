const mongoose = require('mongoose')
const customizethingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    location: {
        type: String
    },
    startime: {
        type: Date,
        required: true
    },
    endtime: {
        type: Date,
        required: true
    },
    fixed: {
        type: Boolean,
        required: true
    },
    member: {
        type: String,
        required: true
    },
    createtime:{
        type:Date,
        required:true,
        default:Date.now
    }
})
// exporting our subscriber schema
module.exports = mongoose.model('customizething', customizethingSchema)