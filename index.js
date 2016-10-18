const express = require('express');
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const jwtConfig = require('./config/jwt.config');
//const mongoConfig = require('./config/mongo.config');
//const User = require('./app/models/user');

var app = express();

// basic configuration
const port = process.env.PORT || 5000;        // set our port
const env = process.env.ENV || 'prod'; 

// config api router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
//  console.log('middleware');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api/v1', router);

if (env !== 'prod') {
  app.listen(port, function() { console.log('listening on port: ' + port)});
} else {
  app.listen(port);
}
