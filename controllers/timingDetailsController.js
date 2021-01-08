var path = require('path');
var mysql = require('mysql');
   

let config = require('./config.js');

var dateFormat = require('dateformat');

let connection = mysql.createConnection(config);
let fs = require('fs');

//let sql = `CALL filterTodo(?)`;

//connection.query(sql, true, (error, results, fields) => {


  exports.getTimingDetails =  function(request, response, next) {
    var uid = request.user.uid;
    var data = request.body;
    console.log(data);
 
 let sql = `CALL getTimingDetails( ? , ? , ? , ? )`;
 connection.query(sql,[ uid ,  data.category  , data.from , data.to ],(error, results, fields) => {

    if (error) {
        return console.error(error.message);
      }
       
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

            var day_o = year + "_" + month + "_" + date ;
            var dir = 'Request_response_data/'+day_o+'/timingDetail';
            mkdir(dir);
        fs.appendFile('./Request_response_data/'+day_o+'/timingDetail/timingDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });
        
      if (results.length > 0) {
          var responseData = new Array();

      if( data.category >0 &&  data.category  <=6){ 
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
         responseData = responseData.sort(compare);
     }  

 if( data.category  == 7){

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

            }
    if( data.category  == 8){
      console.log(results);  
        for (var i=0; i<results[0].length ; i++)
        {
        var tmp = new Object();

        tmp.id = results[0][i]["id"];
        tmp.uv = results[0][i]["uv"];
        tmp.plan = results[0][i]["plan"];
        tmp.info = results[0][i]["info"];
        tmp.parable = results[0][i]["parable"];
        tmp.business = results[0][i]["business"];
        tmp.question = results[0][i]["question"];
        tmp.twentyfist = results[0][i]["twentyfist"];
        tmp.copycat = results[0][i]["copy"];
        tmp.dvd = results[0][i]["dvd"];
        tmp.financial = results[0][i]["financial"];
        tmp.welcome = results[0][i]["welcome"];
        tmp.qnet = results[0][i]["qnet"];
        tmp.earning = results[0][i]["earning"];
        tmp.dream = results[0][i]["dream"];
        tmp.week = results[0][i]["week"];
        tmp.goal = results[0][i]["goal"];
        tmp.percentage = results[0][i]["percentage"];
        tmp.time = dateFormat(results[0][i]["created_on"], "yyyy-mm-dd HH:MM:ss");
                 
        responseData[i] = tmp;
        }
    }
    if( data.category  == 9){
        for (var i=0; i<results[0].length ; i++)
        {
        var tmp = new Object();
        
        tmp.id = results[0][i]["id"];
        tmp.feeling = results[0][i]["feeling"];
        tmp.knowledge = results[0][i]["knowledge"];
        tmp.activity = results[0][i]["activity"];
        tmp.nextdayplan = results[0][i]["nextdayplan"];	
        tmp.goal = results[0][i]["goal"];
        tmp.nextdream = results[0][i]["nextdream"];
        tmp.time = dateFormat(results[0][i]["created_on"], "yyyy-mm-dd HH:MM:ss");
       
        responseData[i] = tmp;
        }
       
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


  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    var timeA = a.time;
    var timeB = b.time;
    timeA =  timeA.replace(/-/g, '/');
    timeB =  timeB.replace(/-/g, '/');
   
    let comparison = 0;
    if ( Date.parse(timeA) > Date.parse(timeB)) {
      comparison = 1;
    } else if (timeA < timeB) {
      comparison = -1;
    }
    return comparison;
  }



  function mkdir(path, root) {

    var dirs = path.split('/'), dir = dirs.shift(), root = (root || '') + dir + '/';

    try { fs.mkdirSync(root); }
    catch (e) {
        //dir wasn't made, something went wrong
        if(!fs.statSync(root).isDirectory()) throw new Error(e);
    }

    return !dirs.length || mkdir(dirs.join('/'), root);
}
  