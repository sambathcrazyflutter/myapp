var express = require('express');
var router = express.Router();
var goal_controller = require('../controllers/goalController');
var verifyapiKey = require('./VerifyApiKey');

router.get('/' , verifyapiKey , goal_controller.getGoal);

router.post('/' , verifyapiKey , goal_controller.inserGoal);

module.exports = router;
