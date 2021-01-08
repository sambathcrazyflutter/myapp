var express = require('express');
var router = express.Router();
var login_controller = require('../controllers/loginController');


/* GET home page. */
router.get('/',login_controller.loginHome);
router.post('/auth',login_controller.auth);
module.exports = router;
