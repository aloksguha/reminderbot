var express = require('express');
var router = express.Router();
var mainController = require('../controllers/mainController.js');

/*
 * GET
 */
router.get('/', mainController.list);

/*
 * POST
 */
router.post('/', mainController.create);


module.exports = router;
