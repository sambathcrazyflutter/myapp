var path = require('path');
var mysql = require('mysql');
let fs = require('fs');


let config = require('./config.js');

let connection = mysql.createConnection(config);

  exports.getAllContacts =  function(request, response, next) {
    
 var uid = request.user.uid;
 //console.log(uid);
     let sql = `CALL allContacts( ? )`;
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
            var dir = 'Request_response_data/'+day_o+'/allContactsDetail';
            mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/allContactsDetail/allContactsDetail.txt', JSON.stringify(results, null, 4), function (err) {
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


  exports.SyncAllContacts =  function(request, response, next) {
    var uid = request.user.uid;
    var data = request.body;

    for (var i=0; i<data.length ; i++)
    {
      console.log(data[i]);
     
      let sql = `CALL syncContacts( ? , ? , ? , ? , ? )`;
      connection.query(sql,[ uid , data[i].idUser , data[i].name , data[i].initial ,data[i].phone],(error, results, fields) => {

         if (error) {
           return console.error(error.message);
         }
       });
       
    }

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
  