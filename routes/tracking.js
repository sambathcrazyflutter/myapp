var express = require('express');
var router = express.Router();
var tracking_controller = require('../controllers/trackingController');
var verifyapiKey = require('./VerifyApiKey');

const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get('/' , verifyapiKey , tracking_controller.getTrackingList)
.all(methodNotAllowed);

//router.get('/' , verifyapiKey , tracking_controller.getTrackingList);

module.exports = router;
