var express = require('express');
var router = express.Router();
var insert_controller = require('../controllers/UserController');


/* GET home page. */
router.get('/',insert_controller.insertUsers);
module.exports = router;
