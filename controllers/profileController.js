var path = require('path');
var mysql = require('mysql');

let config = require('./config.js');

var dateFormat = require('dateformat');
let connection = mysql.createConnection(config);
let fs = require('fs');

//let sql = `CALL filterTodo(?)`;

//connection.query(sql, true, (error, results, fields) => {

  exports.getProfileDetails =  function(request, response, next) {
    var cid = request.params['cid'] 
     let sql = `CALL getProfileById(?)`;
    connection.query(sql,cid,(error, results, fields) => {

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
        fs.appendFile('./Request_response_data/'+day_o+'/profileDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();
                 tmp.id=  results[0][i]["id"];
                 tmp.name=  results[0][i]["name"];
                 tmp.address=  results[0][i]["address"];
                 tmp.job=  results[0][i]["job"];		 
                 tmp.sallery=  results[0][i]["sallery"];
                 tmp.family=  results[0][i]["family"];
                 tmp.country=  results[0][i]["country"];
                 tmp.state=  results[0][i]["state"];
                 tmp.dtime=  results[0][i]["jobtime"];
                 tmp.place=  results[0][i]["place"];
                  tmp.time =dateFormat(results[0][i]["created_on"], "yyyy-mm-dd HH:MM:ss");
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


  exports.insertProfileDetails =  function(request, response, next) {
    var cid = request.params['cid'] 
    var data = request.body;

    
      let sql = 'call insertProfileDetails( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )';
      connection.query(sql,[ cid , data.name , data.address , data.job , data.sallery, data.family  , data.country  , data.state  , data.place , data.dtime  ] ,(error, results, fields) => {

         if (error) {
          response.status(200).send({"error": true,
          "tasks":error.message});
          response.end();
           return console.error(error.message);
         }
         response.status(200).send({"error": false,
         "tasks":"inserted"});
         response.end();
       });
    

   
  };


  exports.updateProfileDetails =  function(request, response, next) {

   
    var cid = request.params['cid'] 
 
    var data = request.body;

      console.log(data);

      let sql = 'call updateProfileDetails( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )';
      connection.query(sql,[ cid , data.name , data.address ,data.job , data.sallery , data.family , data.country , data.state , data.place  , data.dtime ],(error, results, fields) => {

         if (error) {
          response.status(203).send({"error": false,
          "tasks":error});
          response.end();
           return console.error(error.message);
         }
         response.status(200).send({"error": false,
         "tasks":results});
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
  