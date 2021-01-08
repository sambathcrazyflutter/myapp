var path = require('path');
var mysql = require('mysql');

let config = require('./config.js');
var dateFormat = require('dateformat');

let connection = mysql.createConnection(config);

let fs = require('fs');

let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

    var day_o = year + "_" + month + "_" + date ;
    var dir = 'Request_response_data/'+day_o;



//let sql = `CALL filterTodo(?)`;

//connection.query(sql, true, (error, results, fields) => {


  exports.getInfoList =  function(request, response, next) {
    
    let sql = `CALL getInfoList( ? )`;
     var uid = request.user.uid;
     connection.query(sql,[uid],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
      
        mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/t8BasicsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
       
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();

                    
                    tmp.id = results[0][i]["id"];
                    tmp.idUser = results[0][i]["idUser"];
                    tmp.name = results[0][i]["name"];
                    tmp.initial = results[0][i]["initial"];
                    tmp.phone = results[0][i]["phone"];	
                    tmp.basic = results[0][i]["basic"];
                    tmp.time = dateFormat(results[0][i]["updated_on"], "yyyy-mm-dd HH:MM:ss");
                    tmp.percentage = results[0][i]["percentage"].toString();
    

                  responseData[i] = tmp;
               }

          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };


  exports.getInwaitList =  function(request, response, next) {
    let sql = `CALL getInwaitList( ? )`;
     var uid = request.user.uid;
    connection.query(sql,[uid],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
      
        mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/t8BasicsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
       
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                var tmp = new Object();

                    
                    tmp.id = results[0][i]["id"];
                    tmp.idUser = results[0][i]["idUser"];
                    tmp.name = results[0][i]["name"];
                    tmp.initial = results[0][i]["initial"];
                    tmp.phone = results[0][i]["phone"];	
                    tmp.basic = results[0][i]["basic"];
                    tmp.time = dateFormat(results[0][i]["updated_on"], "yyyy-mm-dd HH:MM:ss");
                    tmp.percentage = results[0][i]["percentage"].toString();
    

                  responseData[i] = tmp;
                
                }

          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };

  exports.getPlanList =  function(request, response, next) {
    let sql = `CALL getPlanList( ? )`;
     var uid = request.user.uid;
     connection.query(sql,[uid],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
      
        mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/t8BasicsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
       
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();

                  tmp.id = results[0][i]["id"];
                  tmp.idUser = results[0][i]["idUser"];
                  tmp.name = results[0][i]["name"];
                  tmp.initial = results[0][i]["initial"];
                  tmp.phone = results[0][i]["phone"];	
                  tmp.basic = results[0][i]["basic"];
                  tmp.time = dateFormat(results[0][i]["updated_on"], "yyyy-mm-dd HH:MM:ss");
                  tmp.percentage = results[0][i]["percentage"].toString();
  
                  responseData[i] = tmp;
               }

          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };

  exports.getCloserList =  function(request, response, next) {
    let sql = `CALL getCloserList( ? )`;
     var uid = request.user.uid;
     connection.query(sql,[uid],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
        mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/t8BasicsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();

                  tmp.id = results[0][i]["id"];
                  tmp.idUser = results[0][i]["idUser"];
                  tmp.name = results[0][i]["name"];
                  tmp.initial = results[0][i]["initial"];
                  tmp.phone = results[0][i]["phone"];	
                  tmp.basic = results[0][i]["basic"];
                  tmp.time = dateFormat(results[0][i]["updated_on"], "yyyy-mm-dd HH:MM:ss");
                  tmp.percentage = results[0][i]["percentage"].toString();
  
                    
                  responseData[i] = tmp;
               }

          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };

  exports.getDrList =  function(request, response, next) {
    let sql = `CALL getDrList( ? )`;
     var uid = request.user.uid;
    connection.query(sql,[uid],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
      
        mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/t8BasicsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
       
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();

                  tmp.id = results[0][i]["id"];
                  tmp.idUser = results[0][i]["idUser"];
                  tmp.name = results[0][i]["name"];
                  tmp.initial = results[0][i]["initial"];
                  tmp.phone = results[0][i]["phone"];	
                  tmp.basic = results[0][i]["basic"];
                  tmp.time = dateFormat(results[0][i]["updated_on"], "yyyy-mm-dd HH:MM:ss");
                  tmp.percentage = results[0][i]["percentage"].toString();
  
                  responseData[i] = tmp;
               }

          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };

  exports.getRejectedList =  function(request, response, next) {
    let sql = `CALL getRejectedList( ? )`;
     var uid = request.user.uid;
     connection.query(sql,[uid],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
      
        mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/t8BasicsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
       
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();

                  tmp.id = results[0][i]["id"];
                  tmp.idUser = results[0][i]["idUser"];
                  tmp.name = results[0][i]["name"];
                  tmp.initial = results[0][i]["initial"];
                  tmp.phone = results[0][i]["phone"];	
                  tmp.basic = results[0][i]["basic"];
                  tmp.time = dateFormat(results[0][i]["updated_on"], "yyyy-mm-dd HH:MM:ss");
                  tmp.percentage = results[0][i]["percentage"].toString();
  
                  responseData[i] = tmp;
               }

          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };


  exports.get8basicLists =  function(request, response, next) {
    let sql = `CALL get8basicLists( ? )`;
     var uid = request.user.uid;
    connection.query(sql,[uid],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
        mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/t8BasicsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();

                  tmp.id = results[0][i]["id"];
                  tmp.idUser = results[0][i]["idUser"];
                  tmp.name = results[0][i]["name"];
                  tmp.initial = results[0][i]["initial"];
                  tmp.phone = results[0][i]["phone"];	
                  tmp.basic = results[0][i]["basic"];
                  tmp.time = dateFormat(results[0][i]["updated_on"], "yyyy-mm-dd HH:MM:ss");
                  tmp.percentage = results[0][i]["percentage"].toString();
  
                    
                  responseData[i] = tmp;
               }

          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };


  exports.insertEightBasic =  function(request, response, next) {

    var contact = request.body;
    console.log(contact);
    let sql = `CALL insert8Basic( ? , ? , ? )`;
     connection.query(sql,[contact.cid, contact.basic , contact.percentage ],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
        response.status(200).send({"error": false,
        "tasks":"inserted"});
        response.end();
      });
   
  };


  exports.updateEightBasic =  function(request, response, next) {
    var contact = request.body;
   
    let sql = `call update8Basic( ? , ? , ? )`;
     connection.query(sql,[contact.cid, contact.basic , contact.percentage ],(error, results, fields) => {

        if (error) {
          response.status(200).send({"error": false,
          "tasks":error.message});
          return console.error(error.message);
        }
        response.status(200).send({"error": false,
        "tasks":"updated"});
        response.end();
      });
  };

  exports.updateEightBasicList =  function(request, response, next) {
    
    var contact = request.body;
   
    let sql = `call update8Basic( ? , ? , ? )`;
     connection.query(sql,[contact.cid, contact.basic , contact.percentage ],(error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }
        response.status(200).send({"error": false,
        "tasks":"updated"});
        response.end();
      });

  };


  exports.deleteEightBasic =  function(request, response, next) {

    var cid = request.params['cid'] 
   // var start = req.params['start'] 
   // var end = req.params['end']
   // console.log(t8basic_id);
    let sql = `CALL delete8Basic(?)`;
     connection.query(sql,[cid],(error, results, fields) => {

        if (error) {
          response.status(200).send({"error": false,
          "tasks":error.message});
          return console.error(error.message);
        }
        response.status(200).send({"error": false,
        "tasks":"deleted"});
        response.end();
      });
  
  };

  function mkdir(path, root) {

    var dirs = path.split('/'), dir = dirs.shift(), root = (root || '') + dir + '/';

    try { fs.mkdirSync(root); }
    catch (e) {
        //dir wasn't made, something went wrong
        if(!fs.statSync(root).isDirectory()) throw new Error(e);
    }

    return !dirs.length || mkdir(dirs.join('/'), root);
}
  