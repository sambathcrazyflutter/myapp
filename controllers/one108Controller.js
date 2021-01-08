var path = require('path');
var mysql = require('mysql');

let config = require('./config.js');

let connection = mysql.createConnection(config);

//let sql = `CALL filterTodo(?)`;

//connection.query(sql, true, (error, results, fields) => {


  exports.getone =  function(request, response, next) {

    console.log("calling get one108");
    response.send("sam");
    response.end();

  };


  exports.insertone =  function(request, response, next) {

    var data = request.body;
    var uid = request.user.uid;
      console.log(data);

      let sql = 'CALL insertonezeroeight( ? , ? , ? , ? , ? , ? , ? )';
      connection.query(sql,[uid,data.feeling , data.knowledge , data.activity ,data.nextdayplan ,data.goal ,data.nextdream],(error, results, fields) => {

         if (error) {
           return console.error(error.message);
         }
         console.log("enter");

         response.status(200).send({"error": false,
         "tasks":["inserted"]});
         response.end();
       });
    

  };