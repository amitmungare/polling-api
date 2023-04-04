const express = require('express');
const router = express.Router();

router.use('/api/v1/questions', require('./question'));
router.use('/api/v1/options', require('./option'));

module.exports = router;