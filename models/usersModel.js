var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({
	'username' : String,
	'authdetails' : Array,
	'createdat' : Date
});

module.exports = mongoose.model('users', usersSchema);
