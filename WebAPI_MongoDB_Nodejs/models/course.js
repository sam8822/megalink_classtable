const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
  id:{
    type:String,
    require: true,
    unique:true
  },
  title: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    require: true
  },
  requirelective: {
    type: Boolean,
    require: true
  },
  fullhalf: {
    type: Boolean,
    require: true
  },
  teacher: {
    type: String,
    require: true
  },
  total: {
    type: String,
    require: true
  },
  daytime: {
    type: String
  },
  location: {
    type: String
  },
  notes: {
    trpe: String
  },
  outline: {
    type: String
  }
})
// exporting our subscriber schema
module.exports = mongoose.model('course', courseSchema)