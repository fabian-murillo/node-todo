var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

// We make some endpoints:
module.exports = function(app) {
// BP will parse out JSON from the http request body:
    app.use(bodyParser.json());
// Make sure it can also handle encoded data:
    app.use(bodyParser.urlencoded({ extended: true}))

/* Express http request uses a cb to get all the todos for a particular person, 
   ':uname' will be a param on the url that can change (a person's ID), 
   we can get its value w/ req.param : */
    app.get('/api/todos/:uname', function(req, res) {
    // Give the mongoose model's 'find' method an obj that defines the props we want:
        Todos.find({ username: req.params.uname}, 
        function(err, todos) {
    // If there's an error, output it:
            if (err) throw err;
    // Else let express return the obj as JSON:     
            res.send(todos);
        });

    });

// Getting a particular todo by ID, setup the endpoint:
    app.get('/api/todo/:id', function(req, res) {
    /* Mongoose provides a findById method,
    '_id' is what the props automatically called: */
        Todos.findById({ _id: req.params.id}, 
        // We'll get a single todo item back from findById, so:
        function(err, todo) {
            if (err) throw err;
        // if there's no errors, return the single item
            res.send(todo);
        })
    });

// Adding/Posting Data:
    app.post('/api/todo', function(req, res) {
// Check if we're making a new post, or updating one previously created: 
        
        if (req.body.id) {
        /* If it exists, mongoose has a built in update method, the first param
        is the id, the second is the props ur updating and their vals: */
            Todos.findByIdAndUpdate(req.body.id,
            {
            todo: req.body.todo, 
            isDone: req.body.isDone, 
            hasAttachment: req.body.hasAttachment
            }, 
            // When this finishes, return a success message:
            function(err, todo) {
                if (err) throw err;

                res.send('Success');
            });

        }

        else {
        // If its a new creation:
            var newTodo = Todos({
            // Create our new model object using the data sent in the req:
                username: 'test',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachemtn: req.body.hasAttachment
            });
            // Save it to Mongo & return Sucess:
            newTodo.save(function(err) {
                if (err) throw err;
                res.send('Success');
            });

        }
    })

    app.delete('/api/todo', function(req, res) {
        
        Todos.findByIdAndRemove(req.body.id, function(err) {

            if (err) throw err;
            res.send('Success');

            
        })
    })
}