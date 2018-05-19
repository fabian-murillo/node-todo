var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Creating the Schema model for our data
var todoSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;