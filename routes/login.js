var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');

const methodNotAllowed = (request, response, next) =>  response.send(405, `The ${request.method} method for the "${request.originalUrl}" route is not supported. \n > GET method only suported`);

router
.route('/')
.post('/getkey/:email',login_controller.getKey)
.post('/',login_controller.login)
.all(methodNotAllowed);

//router.post('/getkey/:email',login_controller.getKey);

//router.post('/',login_controller.login);

module.exports = router;
