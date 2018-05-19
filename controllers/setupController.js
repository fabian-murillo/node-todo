// Create some Todos and add them to the DB (seed data):
var Todos = require('../models/todoModel');

// Export a function that takes our express app as a param when this controller is required:
module.exports = function(app) {
    app.get('/api/setupTodos', function(req, res) {
        // seed data for DB:
        var starterTodos = [
            {
                username: 'test',
                todo: 'Buy milk',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Feed dog',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'test',
                todo: 'Learn Node',
                isDone: false,
                hasAttachment: false
            }
        ];
        // output the results after they've succesfully been created:
        Todos.create(starterTodos, function(err,
        results){
            res.send(results);
        })
    })
}