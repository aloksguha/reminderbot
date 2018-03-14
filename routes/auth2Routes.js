var express = require('express');
var router = express.Router();
var auth2Controller = require('../controllers/auth2Controller.js');

/*
 * GET
 */
router.get('/', auth2Controller.handleCallback);

module.exports = router;
