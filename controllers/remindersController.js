var remindersModel = require('../models/remindersModel.js');

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
    show: function (req, res) {
        var id = req.params.id;
        remindersModel.findOne({_id: id}, function (err, reminders) {
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
     */
    create: function (req, res) {
        console.log(req.body)
        var reminders = new remindersModel({
			about : req.body.about,
			toUser : req.body.toUser,
			onDate : new Date(req.body.onDate),
			remindedon : new Date(req.body.remindedon),
			isReminded : false,
			unsuccessfulattempts : req.body.unsuccessfulattempts || 0

        });

        reminders.save(function (err, reminders) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating reminders',
                    error: err
                });
            }
            return res.status(201).json(reminders);
        });
    },

    /**
     * remindersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        remindersModel.findOne({_id: id}, function (err, reminders) {
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
