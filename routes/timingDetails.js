var express = require('express');
var router = express.Router();
var timingDetails_controller = require('../controllers/timingDetailsController');
var verifyapiKey = require('./VerifyApiKey');

const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get('/' , verifyapiKey , timingDetails_controller.getTimingDetails)
.all(methodNotAllowed);

//router.get('/' , verifyapiKey , timingDetails_controller.getTimingDetails);

module.exports = router;
