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
app.use('/auth2', authRoute);
app.use('/reminder', reminderRoutes);




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

