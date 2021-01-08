var express = require('express');
var router = express.Router();
var one108_controller = require('../controllers/one108Controller');
var verifyapiKey = require('./VerifyApiKey');

const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get('/' , verifyapiKey , one108_controller.getone)
.post('/' , verifyapiKey , one108_controller.insertone)
.all(methodNotAllowed);

//router.get('/' , verifyapiKey , one108_controller.getone);

//router.post('/' , verifyapiKey , one108_controller.insertone);

module.exports = router;
