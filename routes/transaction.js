var express = require('express');
var router = express.Router();
var transaction_controller = require('../controllers/transactionController');
var verifyapiKey = require('./VerifyApiKey');

router.get('/' , verifyapiKey , transaction_controller.trans);

module.exports = router;
