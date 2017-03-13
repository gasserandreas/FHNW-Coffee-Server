// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
 
const userSchema = new Schema({
    firstname: String,
    name: String,
    imageName: String,
    coffees: [{
    	key: String,
    	value: String,
	}],
});

module.exports = mongoose.model('User', userSchema);

