var express = require('express');
var router = express.Router();
var remindersController = require('../controllers/remindersController.js');

/*
 * GET
 */
router.get('/', remindersController.list);

/*
 * GET
 */
router.get('/:id', remindersController.show);

/*
 * POST
 */
router.post('/', remindersController.create);

/*
 * PUT
 */
router.put('/:id', remindersController.update);

/*
 * DELETE
 */
router.delete('/:id', remindersController.remove);

module.exports = router;
