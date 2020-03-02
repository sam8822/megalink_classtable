const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
      },
      createtime:{
          type:String,
          required:true,
          default:Date.now
      },
      member:{
          type:String,
          required:true
      },
      important:{
          type:Boolean,
          require:true
      }
})
// exporting our subscriber schema
module.exports = mongoose.model('message', messageSchema)