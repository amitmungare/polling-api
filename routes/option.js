// require express for setting up the express server and setting the router
const express = require('express');
const router = express.Router();
// Setting path for controller function
const controller = require('../controller/optionController');
// route to delete option 
router.delete('/:id/delete', controller.deleteOption);
// route to get option 
router.get('/:id/add_vote', controller.addVote);
// exporting the router
module.exports = router;