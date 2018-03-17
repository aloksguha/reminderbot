var remindersModel = require('../models/remindersModel.js');
var moment = require('moment-timezone');
var _lodash = require('lodash');
var moment = require('moment');
var chalk = require('chalk');
/**
 * remindersController.js
 *
 * @description :: Server-side logic for managing reminderss.
 */
module.exports = {

    /**
     * remindersController.list()
     */
    list: function (req, res) {
        remindersModel.find(function (err, reminderss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting reminders.',
                    error: err
                });
            }
            return res.json(reminderss);
        });
    },

    /**
     * remindersController.show()
     */
    getReminders: function(toDate, fromDate, next){
        console.log(toDate);
        console.log(fromDate)
        remindersModel.find({onDate: {
            $gte: toDate,
            $lt: fromDate
        }}, function (err, reminders) {
            if (err) {
                console.log(chalk.red('ERROR : '+err));
                next(false, err);
            }
            if (!reminders) {
                console.log(chalk.green('No result found, returning []'))
                next(true, []);
            }else{
                console.log(chalk.green('result found, returning reminders'))
                console.log(reminders.length);
                next(true, reminders);
            }

           
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        remindersModel.findOne({ _id: id }, function (err, reminders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting reminders.',
                    error: err
                });
            }
            if (!reminders) {
                return res.status(404).json({
                    message: 'No such reminders'
                });
            }
            return res.json(reminders);
        });
    },

    /**
     * remindersController.create()
     * 
     * { token: 't3YDhGrkkDQ6QkSoZGg1pDyb',
        team_id: 'T9H331LKA',
        team_domain: 'oogwaysays',
        channel_id: 'D9JC04DFV',
        channel_name: 'directmessage',
        user_id: 'U9JHVHMD4',
        user_name: 'aloksguha',
        command: '/remind-me',
        text: '',
        response_url: 'https://hooks.slack.com/commands/T9H331LKA/331471789685/OVZT3PbU157nvxD6mXhesZJn',
        trigger_id: '332196984678.323105054656.137beac72172887422a9a1d8dbab1b31' }
     * 
     */

    verify: function (req, res, next) {

    },

    create: function (req, res) {
        console.log(req.body)
        var remData = req.body;
        if (!remData.text || _lodash.trim(remData.text) === '') {
            res.status(200).send('Sorry, no reminder is set, Setting a reminder\'s format should be \n remind0ne and blah blah')
        }


        var dataTokens = _lodash.words(remData.text);
        console.log(chalk.green(dataTokens));
        var dt = moment(dataTokens[2] + '-' + dataTokens[1] + '-' + dataTokens[0] + 'T' + dataTokens[3] + ':' + dataTokens[4]).format();
        if (new Date() > new Date(dt)) {
            res.status(200).send('No reminder is set, why someone should set a reminder of past, whatever happened, happened !!')
            return;
        } else {
            var about = '';
            if (dataTokens.length < 6) {
                res.status(200).send('please enter some text to remind about')
            } else {
                for (var index = 6; index < dataTokens.length; index++) {
                    about = about + ' ' + dataTokens[index];
                }
            }

            var reminders = new remindersModel({
                about: about,
                toUser: remData.user_id,
                onDate: new Date(dt),
                isReminded: false,
                unsuccessfulattempts: req.body.unsuccessfulattempts || 0,
                creationData: remData
            });
            reminders.save(function (err, reminders) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating reminders',
                        error: err
                    });
                }
                res.status(201).json('<@'+reminders.toUser+'>:+1:Thanks, I\'ll remind you on time :slightly_smiling_face:');
            });
        }

    },

    /**
     * remindersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        remindersModel.findOne({ _id: id }, function (err, reminders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting reminders',
                    error: err
                });
            }
            if (!reminders) {
                return res.status(404).json({
                    message: 'No such reminders'
                });
            }

            reminders.about = req.body.about ? req.body.about : reminders.about;
            reminders.toUser = req.body.toUser ? req.body.toUser : reminders.toUser;
            reminders.onDate = req.body.onDate ? req.body.onDate : reminders.onDate;
            reminders.remindedon = req.body.remindedon ? req.body.remindedon : reminders.remindedon;
            reminders.isReminded = req.body.isReminded ? req.body.isReminded : reminders.isReminded;
            reminders.unsuccessfulattempts = req.body.unsuccessfulattempts ? req.body.unsuccessfulattempts : reminders.unsuccessfulattempts;

            reminders.save(function (err, reminders) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating reminders.',
                        error: err
                    });
                }

                return res.json(reminders);
            });
        });
    },

    /**
     * remindersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        remindersModel.findByIdAndRemove(id, function (err, reminders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the reminders.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
