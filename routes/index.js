// require express for setting up the express server and setting router
const express = require('express');
const router = express.Router();

// Route all requests starting with '/questions' to questions.js file
router.use('/api/v1/questions', require('./question'));
// Route all requests starting with '/options' to options.js file
router.use('/api/v1/options', require('./option'));
// exporting the router
module.exports = router;