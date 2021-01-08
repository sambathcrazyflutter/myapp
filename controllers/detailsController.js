var path = require('path');
var mysql = require('mysql');

let config = require('./config.js');

var dateFormat = require('dateformat');

let connection = mysql.createConnection(config);
let fs = require('fs');

//let sql = `CALL filterTodo(?)`;

//connection.query(sql, true, (error, results, fields) => {


  exports.getDetails =  function(request, response, next) {
     let sql = `CALL getDetailsList(?)`;
     var cid = request.query.cid;
    connection.query(sql,[cid],(error, results, fields) => {

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
        fs.appendFile('./Request_response_data/'+day_o+'/detailsDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
        if (results.length > 0) {
            var responseData = new Array();
              for (var i=0; i<results[0].length ; i++)
               {
                  var tmp = new Object();

                  tmp.id = results[0][i]["id"];
                  tmp.name = results[0][i]["name"];
                  tmp.msg = results[0][i]["msg"];
                  tmp.problem = results[0][i]["problem"];		 
                  tmp.nextplan = results[0][i]["nextPlan"];
                  tmp.place = results[0][i]["place"];
                  tmp.time = dateFormat(results[0][i]["created_on"], "yyyy-mm-dd HH:MM:ss");
                  responseData[i] = tmp;
               }
//console.log(responseData);
          response.status(200).send({"error": false,
           "tasks":responseData});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }
        response.end();
      });
  };


  exports.insertDetails =  function(request, response, next) {

    var data = request.body;
     //console.log(data);
    
      let sql = 'call insertDetails( ? , ? , ? , ? , ? , ? )';
      connection.query(sql,[data.cid , data.name , data.msg , data.problem , data.nextplan , data.place ] ,(error, results, fields) => {

         if (error) {
           return console.error(error.message);
         }
        //console.log(results.insertId);
       });
    
       response.status(201).send({"error": false,
       "tasks":"inserted"});
    response.end();
  };


  exports.updateDetails =  function(request, response, next) {

   //var detail_id = request.query.id; -- from query param

   // from path param
    var detail_id = request.params['id'] ;
    console.log(detail_id);
   // from post body
    var data = request.body;

     // console.log(data);

      let sql = `call updateDetails( ? , ? , ? , ? , ? )`;
      connection.query(sql,[detail_id , data.msg , data.problem ,data.nextplan , data.place],(error, results, fields) => {

         if (error) {
           return console.error(error.message);
         }

       });
    
       response.status(201).send({"error": false,
       "tasks":"updated"});
    
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
  