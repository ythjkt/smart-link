const mongoose = require('mongoose')
const { Schema } = mongoose

const SmartLinkSchema = new Schema({
  targetUrl: String,
  smartLink: String,
  hash: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
    collection: 'smartlinks'
})

module.exports = SmartLink = mongoose.model('smartlinks', SmartLinkSchema)