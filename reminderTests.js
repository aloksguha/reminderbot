var _lodash = require('lodash')
var moment = require('moment');
var remindCot = require('./controllers/remindersController');

var req = { token: 't3YDhGrkkDQ6QkSoZGg1pDyb',
team_id: 'T9H331LKA',
team_domain: 'oogwaysays',
channel_id: 'D9JC04DFV',
channel_name: 'directmessage',
user_id: 'U9JHVHMD4',
user_name: 'aloksguha',
command: '/remind-me',
text: '19/03/2018@18:55 about:going to destist',
response_url: 'https://hooks.slack.com/commands/T9H331LKA/331471789685/OVZT3PbU157nvxD6mXhesZJn',
trigger_id: '332196984678.323105054656.137beac72172887422a9a1d8dbab1b31' };


var text1 = '19/03/2018@18:55 about:going to destist';
var tokens1 = _lodash.words(text1);
var text2 = '19-03-2018 18:55 about:going to destist';
var tokens2 = _lodash.words(text2);
// console.log(tokens1);
// console.log(tokens2);

// var dt = moment('2013-01-31T20:00').format();
// console.log(dt); 
// console.log(new Date(dt));
// console.log(new Date() < new Date(dt));


console.log(remindCot);
toDate = moment('2018-03-17T22:00').format();
fromDate = moment('2018-03-17T23:00').format();
remindCot.getReminders(new Date(toDate), new Date(fromDate), function(flag, result){
    if(flag){
        console.log(result)
    }else{
        console.log(result)
    }

});
