var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var usersSchema = new Schema({
	'username' : String,
	'teamname' : String,
	'authdetails' : Schema.Types.Mixed,
	'createdat' : Date
});

module.exports = mongoose.model('users', usersSchema);
