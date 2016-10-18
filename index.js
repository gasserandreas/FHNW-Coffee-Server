var express = require('express');
var app = express();

const port = process.env.PORT || 5000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('middleware');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/api/v1', router);

app.listen(port, function() { console.log(`listening on port ${port}`)});
