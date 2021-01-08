require('dotenv/config');
const jwt = require("jsonwebtoken");

var path = require('path');
var mysql = require('mysql');
let fs = require('fs');

let config = require('./config.js');

var dateFormat = require('dateformat');
const { validate } = require('node-cron');

let connection = mysql.createConnection(config);

async function check(uid){

    connection.query('select count(u.uid) as allowed from user u where u.uid = ? ',[uid],(error, results, fields) => {
        if (error) {
          
            return 0;
          }

          if(results[0]["allowed"]){
            return 1;
          }else{
            return 0;
          }
   
    });
    

}


exports.trans =  function(request, response, next) {
    var uid = request.user.uid; 
    const valid = check(uid); 
    var trans = request.query.trans;
    let sql = '';
  try{ if(valid){

   if(trans == 1){    
   sql = ` START TRANSACTION `;
   }

    if(trans == 2){
     sql = ` ROLLBACK `;
    }
   
    if(trans == 3){
        sql = ` COMMIT `;
       }
       connection.query(sql,(error, results, fields) => {
  
        if (error) {
        //   response.status(203).send({"error": false,
        //   "tasks":error.message});
          return console.error(error.message);
        }
        response.status(200).send({"error": false,
        "tasks":sql});
        console.log(false);
        response.end();
    });
       
}else{
    // response.status(203).send({"error": true,
    // "tasks":[]});

    console.log(true);
   
}
  }
  catch(error){
    // response.status(203).send({"error": true,
    // "tasks":error});
   console.log(error);
   response.end();
  }
 
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
  