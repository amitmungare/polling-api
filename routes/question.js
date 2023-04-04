const express = require('express');
const router = express.Router();

const controller = require('../controller/questionController');

router.post('/create', controller.createQuestion);
router.post('/:id/options/create',controller.createOption);
router.get('/:id', controller.getQuestion);
router.delete('/:id/delete', controller.deleteQuestion);

module.exports = router;