const mongoose = require('mongoose')
const { Schema } = mongoose

const SmartLinkSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  targetUrl: {
    type: String,
    required: true
  },
  smartLink: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
    collection: 'smartlinks'
})

module.exports = SmartLink = mongoose.model('smartlinks', SmartLinkSchema)