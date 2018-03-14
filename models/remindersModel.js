var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var remindersSchema = new Schema({
	'about' : String,
	'toUser' : String,
	'onDate' : Date,
	'remindedon' : Date,
	'updatedOn': { type: Date, default: Date.now },
	'isReminded' : Boolean,
	'unsuccessfulattempts' : Number,

});

module.exports = mongoose.model('reminders', remindersSchema);
