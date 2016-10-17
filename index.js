var express = require('express');
var app = express();

const port = process.env.PORT || 5000;

app.use('/', express.static("public"));

app.listen(port, function() { console.log(`listening on port ${port}`)});
