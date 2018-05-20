var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController')
var port = process.env.PORT || 3000;

// Point application to our assets folder
app.use('/assets', express.static(__dirname + '/public'));
// Set a view engine
app.set('view engine', 'ejs');

/* Connect to MongoDB, !NOTE: In production the un & pw would be encrypted, 
but I'm going to delete the DB @ the end: */
mongoose.connect(config.getDbConnectionString());

/* setupController returns a func which adds an endpoint to the express app 
& adds the data using mongo 'create' method: */
setupController(app);

// We make our app aware of all the endpoints, calling the func returned from require:
apiController(app)

app.listen(port);