var express = require('express');
var router = express.Router();
var details_controller = require('../controllers/profileController');
var verifyapiKey = require('./VerifyApiKey');

const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get('/:cid' , verifyapiKey , details_controller.getProfileDetails)
.post('/:cid' , verifyapiKey , details_controller.insertProfileDetails)
.put('/:cid' , verifyapiKey , details_controller.updateProfileDetails)
.all(methodNotAllowed);

//router.get('/:cid' , verifyapiKey , details_controller.getProfileDetails);

//router.post('/:cid' , verifyapiKey , details_controller.insertProfileDetails);

//router.put('/:cid' , verifyapiKey , details_controller.updateProfileDetails);

module.exports = router;
