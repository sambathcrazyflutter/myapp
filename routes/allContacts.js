var verifyapiKey = require('./VerifyApiKey');
var express = require('express');
var router = express.Router();
var all_Contacts_controller = require('../controllers/all_Contacts_controller');

const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.get('/',verifyapiKey,all_Contacts_controller.getAllContacts)
.post('/',verifyapiKey,all_Contacts_controller.SyncAllContacts)
.all(methodNotAllowed);

//router.get('/',verifyapiKey,all_Contacts_controller.getAllContacts);

//router.post('/',verifyapiKey,all_Contacts_controller.SyncAllContacts);

module.exports = router;
