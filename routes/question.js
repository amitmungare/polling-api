// require express for setting up the express server and setting router
const express = require('express');
const router = express.Router();
// Setting path for controller function
const controller = require('../controller/questionController');

// route to create question 
router.post('/create', controller.createQuestion);
// route to create option 
router.post('/:id/options/create',controller.createOption);
// route to get question 
router.get('/:id', controller.getQuestion);
// route to delete question 
router.delete('/:id/delete', controller.deleteQuestion);
// exporting the router
module.exports = router;