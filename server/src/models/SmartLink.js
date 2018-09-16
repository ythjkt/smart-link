const mongoose = require('mongoose');
const { Schema } = mongoose;

const SmartLink = new Schema({
  targetUrl: String,
  smartLink: String,
  urlCode: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
    collection: 'SmartLinks'
});

module.exports = mongoose.model('SmartLink', SmartLink);