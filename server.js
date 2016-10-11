const express = require('express');
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//var pause = require('connect-pause');

const jwtConfig = require('./config/jwt.config');
const mongoConfig = require('./config/mongo.config');
const User = require('./app/models/user');

const app = express();

app.use(cors());
//app.use(pause(1000)); // DEBUG

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
const authCheck = jwt(jwtConfig);

mongoose.connect(process.env.MONGO_URL || mongoConfig.database);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// count up/down coffee counter
router.route('/users/:user_id/countUpCoffee')
  .post(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }

      // increase counter
      user.coffeeCounter = user.coffeeCounter + 1;

      // save the user
      user.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(user.toObject({ getters: true }));
      });
    });
  });

router.route('/users/:user_id/countUpCoffee')
  .post(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }

      // increase counter
      user.coffeeCounter = user.coffeeCounter - 1;

      // save the user
      user.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(user.toObject({ getters: true }));
      });
    });
  });

// REST API calls
router.route('/users')

  // create a user (accessed at POST http://localhost:8080/api/v1/users)
  .post(function(req, res) {
    var user = new User();
    user.coffeeCounter = 0;
    user.lastname = req.body.lastname;
    user.firstname = req.body.firstname;
    //user.coffeeCounter = req.body.coffeeCounter;

    user.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json(user.toObject({ getters: true }));
    });
  })

  // get all the bears (accessed at GET http://localhost:8080/api/v1/users)
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) {
        res.send(err);
      }
      const objs = users.map(user => user.toObject({ getters: true }));
      res.json(objs);
    });
  });

router.route('/users/:user_id')

  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }
      res.json(user.toObject({ getters: true }));
    });
  })

  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }

      user.lastname = req.body.lastname;
      user.firstname = req.body.firstname;
      //user.coffeeCounter = req.body.coffeeCounter;

      // save the user
      user.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(user.toObject({ getters: true }));
      });
    });
  })

  .delete(function(req, res) {
    const user_id = req.params.user_id;
    User.remove({
      _id: user_id
    }, function(err, bear) {
      if(err) {
          res.send(err);
      }
      res.json(user_id);
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

/*
app.get('/api/contacts', (req, res) => {
  const allContacts = contacts.map((contact) => {
    console.log('');
    return { id: contact.id, name: contact.name };
  });
  res.json(allContacts);
});

app.get('/api/contacts/:id', authCheck, (req, res) => {
  console.log('');
  res.json(contacts
    .filter(contact => contact.id === parseInt(req.params.id))); // eslint-disable-line radix
});
*/
