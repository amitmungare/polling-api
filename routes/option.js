const express = require('express');
const router = express.Router();

const controller = require('../controller/optionController');

router.delete('/:id/delete', controller.deleteOption);
router.get('/:id/add_vote', controller.addVote);

module.exports = router;