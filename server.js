'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const config = require('./config/config');
var mongoose = require('mongoose');
var chalk = require('chalk')
const mainRoute = require('./routes/mainRoutes');
const userRoute = require('./routes/usersRoutes');
const authRoute = require('./routes/auth2Routes');
const reminderRoutes = require('./routes/remindersRoutes');
var morgan = require('morgan');
var cron = require('node-cron');
var _lodash = require('lodash')
var moment = require('moment');
var remindCot = require('./controllers/remindersController');
 



// cron.schedule('* * * * *', function(){
//   console.log('running a task every minute');
//     var toDate = moment('2018-03-17T22:00').format();
//     var fromDate = moment('2018-03-17T23:00').format();
//     remindCot.getReminders(new Date(toDate), new Date(fromDate), function(flag, results){
//         if(flag){
//             console.log(result);
//             processReminders(results)
//         }else{
//             console.log(results)
//         }
        
//     });
// });


var processReminders = function(reminders){
    console.log('processing reminders'+reminders.length);
    for(var index in reminders){
        console.log('ttt'+index)
        var reminder = reminders[index];
        console.log(reminder)
        console.log('sending reminder...');
        sendReminder(reminder);
    }
};

var sendReminder = function(reminder){
    console.log(reminder.about)

    var respMsg = {
        'channel': reminder.creationData.channel_id,
        'text': reminder.about
    }


    var options = {
        'url': 'https://slack.com/api/chat.postMessage',
        'method': 'POST',
        'headers': {
            'content-type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer xoxp-323105054656-324607599446-331350167762-b393c2fa815a03b027c91295c80ef4ce'
            
        },
        'body': JSON.stringify(respMsg)
    };


    console.log(options);

    function callback(error, response, body) {
        console.log(error);
        console.log(body);
    }

    request(options, callback); 
}

var toDate = moment('2018-03-17T22:00').format();
var fromDate = moment('2018-03-17T23:00').format();
remindCot.getReminders(new Date(toDate), new Date(fromDate), function(flag, results){
        console.log('in callback => '+flag);
        console.log('rwerwrwrew')
        if(flag){
            console.log('in serverjs'+results);
            processReminders(results)
        }else{
            console.log(results)
        }
        
    });

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'))

//Routes
app.use('/', mainRoute);
app.use('/user', userRoute);
app.use('/oauth2', authRoute);
app.use('/reminder', reminderRoutes);
app.post('/events', function (req, res, nxt) {
    if(req.body && req.body.challenge){
        res.status(200).send(req.body.challenge);
    }}
);   
// Bootstrap db connection
var db = mongoose.connect('mongodb://localhost/reminderdb-dev', function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log(chalk.blue('We are good !! Connected'));
    app.listen(config.port, function (req, res) {
        console.info(`Started Express server on port ${config.port}`)
    })
});

