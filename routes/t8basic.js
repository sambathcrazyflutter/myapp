var express = require('express');
var router = express.Router();
var t8basic_controller = require('../controllers/t8basicController');
var verifyapiKey = require('./VerifyApiKey');



router.get('/get8basicLists/' , verifyapiKey , t8basic_controller.get8basicLists);


router.get('/getInfoList/' , verifyapiKey , t8basic_controller.getInfoList);


router.get('/getInwaitList/' , verifyapiKey , t8basic_controller.getInwaitList);


router.get('/getPlanList/' , verifyapiKey , t8basic_controller.getPlanList);


router.get('/getCloserList/' , verifyapiKey , t8basic_controller.getCloserList);


router.get('/getDrList/' , verifyapiKey , t8basic_controller.getDrList);


router.get('/getRejectedList/' , verifyapiKey , t8basic_controller.getRejectedList);


router.post('/' , verifyapiKey , t8basic_controller.insertEightBasic);


router.put('/' , verifyapiKey , t8basic_controller.updateEightBasic);


router.put('/list' , verifyapiKey , t8basic_controller.updateEightBasicList);


router.delete('/:cid' , verifyapiKey , t8basic_controller.deleteEightBasic);


module.exports = router;
