var usersModel = require('../models/usersModel.js');

/**
 * usersController.js
 *
 * @description :: Server-side logic for managing userss.
 */
module.exports = {

    /**
     * usersController.list()
     */
    list: function (req, res) {
        usersModel.find(function (err, userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            return res.json(userss);
        });
    },

    /**
     * usersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users.',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }
            return res.json(users);
        });
    },

    /**
     * usersController.create()
     */
    create: function (req, res) {
        var users = new usersModel({
			username : req.body.username,
			authdetails : req.body.authdetails,
			createdat : req.body.createdat

        });

        users.save(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating users',
                    error: err
                });
            }
            return res.status(201).json(users);
        });
    },

    /**
     * usersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        usersModel.findOne({_id: id}, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting users',
                    error: err
                });
            }
            if (!users) {
                return res.status(404).json({
                    message: 'No such users'
                });
            }

            users.username = req.body.username ? req.body.username : users.username;
			users.authdetails = req.body.authdetails ? req.body.authdetails : users.authdetails;
			users.createdat = req.body.createdat ? req.body.createdat : users.createdat;
			
            users.save(function (err, users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating users.',
                        error: err
                    });
                }

                return res.json(users);
            });
        });
    },

    /**
     * usersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        usersModel.findByIdAndRemove(id, function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the users.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
