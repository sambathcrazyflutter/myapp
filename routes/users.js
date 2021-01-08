var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/UserController');


/* GET home page. */
router.get('/',user_controller.showUsers);

module.exports = router;