const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    collection: 'SmartLinks'
});

module.exports = SmartLink = mongoose.model('SmartLink', SmartLinkSchema);