const chalk = require('chalk');

const config = require('./../config/config');
const request = require('request');
const userController = require('./usersController');
var usersModel = require('../models/usersModel.js');
const _lodash = require('lodash');

/**
 * auth2Controller.js
 *
 * @description :: Server-side logic for managing auth2s.
 */
module.exports = {
    /**
     * auth2Controller.handleCallback()
     */
    handleCallback: function (req, res) {
        console.log('get')
        console.log(req.body);
        console.log(req.query.code);

        var code = req.query.code;
        var state = req.query.state;

        var options = {
            'url': config.Slack_Auth_Access_url,
            'qs': {
                'code': code,
                'client_id': config.Slack_Client_Id,
                'client_secret': config.Slack_Client_Secret

            },
            'method': 'GET',
            'headers': {
                'content-type': 'application/x-www-form-urlencoded'
            }
        };

        function callback(error, response, body) {
            console.log(error);
            console.log(body);
            var result = JSON.parse(body);
            console.log(chalk.blue('Got result from Slack, now saving it locally'));
            usersModel.find({
                'username': result.user_id,
                'teamname': result.team_name
            },
                function (err, userObj) {
                    console.log(chalk.green('see this'))
                    if (err) {
                        console.log(chalk.red("Error...", err));
                        res.status(500).json({
                            message: 'Some internal shit issues while checking user existance',
                            error: err
                        });
                    }
                    // console.log(chalk.blue("User : "));
                    // console.log(typeof userObj);
                    // console.log('1.--->>> ' + userObj);
                    _lodash.forEach(userObj, function(value, key){
                        console.log(key)
                    })
                    
                    if (! _lodash.isEmpty(userObj)) {
                        console.log(chalk.green("User is present with same Team"));
                        console.log(chalk.red("Trying to Remove it"));
                        usersModel.remove({
                            'username': result.user_id,
                            'teamname': result.team_name
                        }, function (err, user) {
                            if (err) {
                                console.log(chalk.red("Error...", err));
                                res.status(500).json({
                                    message: 'Some internal shit issues while deleting existing User',
                                    error: err
                                });
                            }
                            else {
                                console.log(chalk.green("User is deleted now saving it again"));
                                _saveUser(result, function (flag, result) {
                                    if (!flag) {
                                        res.status(500).json({
                                            message: 'Some internal shit issues while saving user existance',
                                            error: err
                                        });
                                    } else {
                                        res.status(201).json({ message: 'Thanks for registering with us !!!' });
                                    }
                                });
                            }
                        })

                    } else {
                        console.log(chalk.green("User is NOT present with same Team"));
                        _saveUser(result, function (flag, result) {
                            if (!flag) {
                                res.status(500).json({
                                    message: 'Some internal shit issues while saving user existance',
                                    error: err
                                });
                            } else {
                                res.status(201).json({ message: 'Thanks for registering with us !!!' });
                            }
                        });
                    }



                });
        }
        request(options, callback);
    }

}//end of module.export


function _saveUser(userData, next) {
    console.log(chalk.green('Saving User now...'));
    var users = new usersModel({
        username: userData.user_id,
        teamname: userData.team_name,
        authdetails: userData,
        createdat: new Date()

    });

    users.save(function (err, users) {
        if (err) {
            next(false, err);
        }
        else {
            next(true, users);
        }
    });
}


