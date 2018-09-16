const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoList = new Schema({
    desc: {
        type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
},
 // mongoose generates collection with the name of the model
 // if this option is not given.
{
    collection: 'Tasks'
});

module.exports = mongoose.model('TodoList', TodoList);
