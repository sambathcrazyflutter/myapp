var express = require('express');
var router = express.Router();
var relation_controller = require('../controllers/relationController');
var verifyapiKey = require('./VerifyApiKey');
 
const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get('/' , verifyapiKey , relation_controller.getRelationShip)
.post('/' , verifyapiKey , relation_controller.insertRelationShip)
.all(methodNotAllowed);

//router.get('/' , verifyapiKey , relation_controller.getRelationShip);

//router.post('/' , verifyapiKey , relation_controller.insertRelationShip);

module.exports = router;
