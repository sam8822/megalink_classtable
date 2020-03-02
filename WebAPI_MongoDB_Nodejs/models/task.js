const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      finished:{
          type:Boolean,
          required:true
      },
      executor:{
          type:[String],
          required:true
      },
      assigner:{
          type:[String],
          required:true
      },
      createtime:{
          type:Date,
          required:true
      },
      startime:{
          type:Date,
          required:true
      },
      endtime:{
          type:Date,
          required:true
      },
      content:{
          type:String,
          required:true
      }
})
// exporting our subscriber schema
module.exports = mongoose.model('Stask', taskSchema)