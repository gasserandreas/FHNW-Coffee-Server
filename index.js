const express = require('express');
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const User = require('./app/models/user');
// const CoffeeType = require('./app/models/coffeeType');

var app = express();

// basic configuration
const mongoURL = process.env.MONGO_URL;
const port = process.env.PORT;        // set our port
const env = process.env.ENV;

// mongodb
// mongoose.connect(mongoURL);

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
    res.json({ message: 'hooray! welcome to our api! :D' });
});

/*
// more routes for our API will happen here
router.route('/admin/deleteAll')
  .post(function(req, res) {
    User.remove({}, function(err, user) {
      if(err) {
          res.send(err);
      }
      CoffeeType.remove({}, function(err, coffee) {
        if(err) {
            res.send(err);
        }
        res.json(coffee);
      });
    });

  });

// count up/down coffee counter
router.route('/users/:user_id/countUpCoffee/:coffee_id')
  .post(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }

      const coffee_id = req.params.coffee_id

      // update array value
      var coffee = null;
      var counter = 0;
      while(coffee === null && counter < user.coffees.length) {
        if (user.coffees[counter].key === coffee_id) {
          coffee = user.coffees[counter];
        }
        counter++;
      }

      // if not yet in array, create new one
      if (coffee === null) {
        coffee = {
          "key": coffee_id,
          "value": 1,
        };
        user.coffees.push(coffee);
      } else {
        coffee.value = parseInt(coffee.value) + 1; // count up
      }

      // save the user
      user.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(user.toObject({ getters: true }));
      });
    });
  });

router.route('/users/:user_id/countDownCoffee/:coffee_id')
  .post(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }

      const coffee_id = req.params.coffee_id

      // update array value
      var coffee = null;
      var counter = 0;
      while(coffee === null && counter < user.coffees.length) {
        if (user.coffees[counter].key === coffee_id) {
          coffee = user.coffees[counter];
        }
        counter++;
      }

      // if not yet in array, create new one
      if (coffee === null) {
        coffee = {
          "key": coffee_id,
          "value": 0,
        };
        user.coffees.push(coffee);
      } else if (coffee.value > 0) {
        coffee.value = parseInt(coffee.value) - 1; // count down
      }

      // save the user
      user.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(user.toObject({ getters: true }));
      });
    });
  });

// User REST API calls
router.route('/users')

  // create a user (accessed at POST http://localhost:8080/api/v1/users)
  .post(function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.firstname = req.body.firstname;
    user.imageName = req.body.imageName;
    user.coffees = req.body.coffees;

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

      user.name = req.body.name;
      user.firstname = req.body.firstname;
      user.imageName = req.body.imageName;
      user.coffees = req.body.coffees;

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

// CoffeeType REST API calls
router.route('/coffees')

  // create a coffee (accessed at POST http://localhost:8080/api/v1/users)
  .post(function(req, res) {
    var coffee = new CoffeeType();
    coffee.name = req.body.name;
    coffee.color = req.body.color;
    coffee.coffee_id = req.body.coffee_id;

    coffee.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json(coffee.toObject({ getters: true }));
    });
  })

  // get all the bears (accessed at GET http://localhost:8080/api/v1/users)
  .get(function(req, res) {
    CoffeeType.find(function(err, coffees) {
      if (err) {
        res.send(err);
      }
      const objs = coffees.map(coffee => coffee.toObject({ getters: true }));
      res.json(objs);
    });
  });

router.route('/coffees/:coffees_id')

  .get(function(req, res) {
    res.json({ message: 'get: /coffees/:coffees_id'});
    CoffeeType.findById(req.params.coffees_id, function(err, coffee) {
      if(err) {
        res.send(err);
      }
      res.json(coffee.toObject({ getters: true }));
    });
  })

  .put(function(req, res) {
    res.json({ message: 'put: /coffees/:coffees_id'});
    CoffeeType.findById(req.params.coffees_id, function(err, coffee) {
      if(err) {
        res.send(err);
      }

      var coffee = new CoffeeType();
      coffee.name = req.body.name;
      coffee.color = req.body.color;
      coffee.coffee_id = req.body.coffee_id;

      // save the coffee
      coffee.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json(coffee.toObject({ getters: true }));
      });
    });
  })

  .delete(function(req, res) {
    res.json({ message: 'delete: /coffees/:coffees_id'});
    const coffees_id = req.params.coffees_id;
    CoffeeType.remove({
      _id: coffees_id
    }, function(err, bear) {
      if(err) {
          res.send(err);
      }
      res.json(coffees_id);
    });
  });
*/
app.use('/api/v1', router);
app.use('/images/', express.static(__dirname + '/images'));

if (env !== 'prod') {
  app.listen(port, function() { console.log('listening on port: ' + port)});
} else {
  app.listen(port);
}
