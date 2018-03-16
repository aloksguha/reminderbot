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

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common'))

//Routes
app.use('/', mainRoute);
app.use('/user', userRoute);
app.use('/oauth2', authRoute);
app.use('/reminder', reminderRoutes);

app.post('/command', function(req, res, nxt){
    console.log(req.body);
    sendReplyOfCommand_news(req.body);
    res.status(200).send('Thanks for adding a reminder, I\'ll remind you on TimeRanges..');
});


function sendReplyOfCommand_news(commandData){
    console.log(commandData)
    var responseUrl = commandData.response_url;
    var respMsg = {
        "response_type": "in_channel",
        "text": "Thanks for using TCI commands",
        "attachments": [
            {
                "title":"TIBCO Cloud Integration : NEWS",
                "title_link":"https://www.tibco.com/products/cloud-integration",
                "text": "Latest from TCI",
                "color": "#7CD197",
                "image_url":"https://www.tibco.com/blog/wp-content/uploads/2015/08/tibco-logo-620x360.jpg"
            }
        ]
    }

    var options = {
        'url': responseUrl,
        'method': 'POST',
        'headers': {
            'content-type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer xoxp-323105054656-324607599446-330378059904-1c7f91ff975ba30424d0c088c5338c3f '
        },
        'body': JSON.stringify(respMsg)
    };

    console.log(options);

    function callback(error, response, body) {
        console.log(error);
        console.log(body);
    }

    request(options, callback); 
    return;
}




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
//app.use(db);

;

