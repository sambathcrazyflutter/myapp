var path = require('path');
var mysql = require('mysql');

let config = require('./config.js');

var dateFormat = require('dateformat');

let connection = mysql.createConnection(config);
let fs = require('fs');

//let sql = `CALL filterTodo(?)`;

//connection.query(sql, true, (error, results, fields) => {


  exports.getRelationShip =  function(request, response, next) {
    getRelation(request, response);
  };

 function getRelation (request, response){

  var uid = request.user.uid;
    
  let sql = `CALL getRelationShipList( ? )`;
  connection.query(sql,[uid],(error, results, fields) => {

      if (error) {
        return console.error(error.message);
      }
     
      let ts = Date.now();
      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

          var day_o = year + "_" + month + "_" + date ;
          var dir = 'Request_response_data/'+day_o;
          mkdir(dir);
      fs.appendFile('./Request_response_data/'+day_o+'/relationDetail.txt', JSON.stringify(results, null, 4), function (err) {
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
                tmp.time = dateFormat(results[0][i]["created_on"], "yyyy-mm-dd HH:MM:ss");
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
  }


  exports.insertRelationShip =  function(request, response, next) {

    var CallLog = request.body;
   // console.log(CallLog);
    for (var i=0; i<CallLog.length ; i++)
    {
      console.log(CallLog[i]);
   
      let sql = `call insertRelationShip(?)`;
      connection.query(sql,[CallLog[i]],(error, results, fields) => {
 
         if (error) {
           return console.error(error.message);
         }
       });
    }
    response.status(200).send({"error": false,
    "tasks":"inserted"});

    response.end();
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
  