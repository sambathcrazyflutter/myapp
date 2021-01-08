var express = require('express');
var router = express.Router();
var details_controller = require('../controllers/detailsController');
var verifyapiKey = require('./VerifyApiKey');

const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get('/detailList' , verifyapiKey , details_controller.getDetails)
.post('/insertdetails' , verifyapiKey , details_controller.insertDetails)
.put('/updetails/:id' , verifyapiKey , details_controller.updateDetails)
.all(methodNotAllowed);

//router.get('/detailList' , verifyapiKey , details_controller.getDetails);

//router.post('/insertdetails' , verifyapiKey , details_controller.insertDetails);

//router.put('/updetails/:id' , verifyapiKey , details_controller.updateDetails);

module.exports = router;
