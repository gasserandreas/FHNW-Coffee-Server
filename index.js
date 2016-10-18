const express = require('express');
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./app/models/user');

var app = express();

// basic configuration
const mongoURL = process.env.MONGO_URL;
const port = process.env.PORT;        // set our port
const env = process.env.ENV;

// mongodb
mongoose.connect(mongoURL);

// server config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// config api router
const router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    next();
});

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

router.route('/users/:user_id/countDownCoffee')
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
    res.json({ message: 'get: /users/:user_id'});
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }
      res.json(user.toObject({ getters: true }));
    });
  })

  .put(function(req, res) {
    res.json({ message: 'put: /users/:user_id'});
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
    res.json({ message: 'delete: /users/:user_id'});
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

app.use('/api/v1', router);

if (env !== 'prod') {
  app.listen(port, function() { console.log('listening on port: ' + port)});
} else {
  app.listen(port);
}
