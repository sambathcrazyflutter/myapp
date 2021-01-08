var express = require('express');
var router = express.Router();
var callog_controller = require('../controllers/callLogController');
var verifyapiKey = require('./VerifyApiKey');


const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get(verifyapiKey , callog_controller.getCallLog)
.all(methodNotAllowed);



module.exports = router;

