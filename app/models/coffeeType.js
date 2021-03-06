// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
 
const coffeeTypeSchema = new Schema({
    name: String,
    color: String,
    coffee_id: String,
    updated: String,
},
{
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('CoffeeType', coffeeTypeSchema);

