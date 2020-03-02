const mongoose = require('mongoose')
const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      createtime:{
          type:Date,
          required:true,
          default:Date.now
      },
      member:{
          type:String,
          required:true
      }
})
// exporting our subscriber schema
module.exports = mongoose.model('document',documentSchema)