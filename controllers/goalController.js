var path = require('path');
var mysql = require('mysql');

let config = require('./config.js');

var dateFormat = require('dateformat');

let connection = mysql.createConnection(config);
let fs = require('fs');


//let sql = `CALL filterTodo(?)`;

//connection.query(sql, true, (error, results, fields) => {


  exports.getGoal =  function(request, response, next) {
  
    // console.log(request.query);
   // console.log(request.body);

    var goaltype = request.query.goaltype;
    var uid = request.user.uid;

    let sql = `CALL getGoal( ? , ? )`;
    connection.query(sql,[uid,goaltype],(error, results, fields) => {

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
        fs.appendFile('./Request_response_data/'+day_o+'/goalDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });


        if (results.length > 0) {
            var responsegoal = new Array();
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
                     
                responsegoal[i] = tmp;
             
                  
//console.log(responseData[i].time);
               }  
          response.status(200).send({"error": false,
           "tasks":responsegoal});
        } else {
          response.status(200).send({"error": false,
          "tasks":[]});
        }			
        response.end();
    });
  };


  exports.inserGoal =  function(request, response, next) {
   
    var goal = request.body;
    var uid = request.user.uid;
    var totalPercentage = 0;  
    var  goaltype = 0;
    var percentage = new Array();
    var goalStatus = new Array();         
 
    let sql = `CALL getGoal( ? , ? )`;
    connection.query(sql,[uid,goaltype],(error, results, fields) => {

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
        fs.appendFile('./Request_response_data/'+day_o+'/goalDetail.txt', JSON.stringify(results, null, 4), function (err) {
        if (err) return console.log(err);
        console.log('output generated');
        });


        if (results.length > 0) {
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
                tmp.time = results[0][i]["created_on"];
                     
                percentage[i] = tmp;

               }  
       }

       goaltype = 1;
       let sql2 = `CALL getGoal( ? , ? )`;
       connection.query(sql2,[uid,goaltype],(error, results2, fields) => {
   
           if (error) {
             return console.error(error.message);
           }

           fs.appendFile('./Request_response_data/'+day_o+'/goalDetail.txt', JSON.stringify(results, null, 4), function (err) {
           if (err) return console.log(err);
           console.log('output generated');
           });
   
   
           if (results2.length > 0) {
                 for (var i=0; i<results2[0].length ; i++)  
                  {  
                   var tmp = new Object();
                              
                   tmp.id = results2[0][i]["id"];
                   tmp.uv = results2[0][i]["uv"];
                   tmp.plan = results2[0][i]["plan"];
                   tmp.info = results2[0][i]["info"];
                   tmp.parable = results2[0][i]["parable"];
                   tmp.business = results2[0][i]["business"];
                   tmp.question = results2[0][i]["question"];
                   tmp.twentyfist = results2[0][i]["twentyfist"];
                   tmp.copycat = results2[0][i]["copy"];
                   tmp.dvd = results2[0][i]["dvd"];
                   tmp.financial = results2[0][i]["financial"];
                   tmp.welcome = results2[0][i]["welcome"];
                   tmp.qnet = results2[0][i]["qnet"];
                   tmp.earning = results2[0][i]["earning"];
                   tmp.dream = results2[0][i]["dream"];
                   tmp.week = results2[0][i]["week"];
                   tmp.goal = results2[0][i]["goal"];
                   tmp.percentage = results2[0][i]["percentage"];
                   tmp.time = dateFormat(results2[0][i]["created_on"], "yyyy-mm-dd HH:MM:ss");
                        
                   goalStatus[i] = tmp;
   
                  }  
                 }


                 console.log(percentage);
   

                 console.log(goalStatus);
                
   
                 if(percentage != null){
                  for(i = 0; i<percentage.length ; i++){
                   totalPercentage = totalPercentage + percentage[i]['percentage'];
                 }
               }
               

              let goalPercnt ;
               if(goalStatus != null){
                goalPercnt =   callInsertGoal(goalStatus[0],goal,totalPercentage);
            //    response.end();
              }
               else{
                goalPercnt =   callInsertGoal(goalStatus,goal,totalPercentage);
            
           //     response.end();
              };  
              
   
             let sql = 'call insertGoal( ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )';
              connection.query(sql,[ uid ,  goal.uv ,  goal.plan ,  goal.info ,  goal.parable
                ,  goal.business ,  goal.question ,  goal.twentyfist ,  goal.copycat ,  goal.dvd
                ,  goal.financial ,  goal.welcome ,  goal.qnet ,  goal.earning ,  goal.dream
                ,  goal.week ,  goal.goal , goalPercnt.currentpercentage ,  goalPercnt.totalPercentage ] ,(error, results, fields) => {
          
              if (error) {
                return console.error(error.message);
              }
              console.log("insert going");
              
              response.status(200).send({"error": false,
              "tasks":["inserted"]});
              response.end();
              
            });  

   
       });

    });
 
    
 }
 

 function callInsertGoal(goalStatus,goal,totalPercentage){

  //console.log(goalStatus);
 // console.log(goal);
 // console.log(totalPercentage);
  var currentpercentage=0;
  if(goalStatus!=null && goal.goal == 0){
 var uvratio=0;
 var planratio=0;
 var inforatio=0;
 var knowledgeratio=0;
  
 var parableratio =0;
 var businessratio =0;
 var  questionratio =0;
 var twentyfirstratio =0;
 var copycatratio =0;
  
 var totalbookratio=0;
 var  dvdratio=0;
 var  financialratio=0;
 var welcomeratio=0;
 var qnetprofileratio=0;
  
  
  
  
 var goalcount=0;
 var  knowledgcount=0;
 var bookcount=0;
 var  bookratio = 0;
  
  if(goalStatus['uv'] !=0){
      uvratio = goal.uv/goalStatus['uv'];
      goalcount++;
  }
  if(goalStatus['plan'] !=0){
      planratio= goal.plan/goalStatus['plan'];
      goalcount++;
  }
  if(goalStatus['info'] !=0){
      inforatio= goal.info/goalStatus['info'];
      goalcount++;
  }

  if(goalStatus['parable'] !=0){
      parableratio= (1/goalStatus['parable'])*goal.parable;
      bookcount++;
  }
  if(goalStatus['business'] !=0){
      businessratio= (1/goalStatus['business'])*goal.business;
      bookcount++;
  }
  if(goalStatus['question'] !=0){
      questionratio= (1/goalStatus['question'])*goal.question;
      bookcount++;
  }
  if(goalStatus['twentyfist'] !=0){
      twentyfirstratio= (1/goalStatus['twentyfist'])*goal.twentyfist;
      bookcount++;
  }
  if(goalStatus['copycat'] !=0){
      copycatratio= (1/goalStatus['copycat'])*goal.copycat;
      bookcount++;
  }



  if(goalStatus['dvd'] !=0){
      dvdratio=goal.dvd/goalStatus['dvd'];
      knowledgcount++;
  }
  if(goalStatus['financial'] !=0){
      financialratio=goal.financial/goalStatus['financial'];
      knowledgcount++;
  }
  if(goalStatus['welcome'] !=0){
      welcomeratio=goal.welcome/goalStatus['welcome'];
      knowledgcount++;
  
  }
  if(goalStatus['qnet'] !=0){
      qnetprofileratio=goal.qnet/goalStatus['qnet'];
      knowledgcount++;
  }
  
  if(bookcount !=0){
      totalbookratio = (parableratio+businessratio+questionratio+twentyfirstratio+copycatratio)/bookcount;
      knowledgcount++;
  }
  
  if(knowledgcount !=0){
      knowledgeratio= (totalbookratio+dvdratio+financialratio+welcomeratio+qnetprofileratio)/knowledgcount;	
  }
  
  currentpercentage = uvratio*10+planratio*30+inforatio*40+knowledgeratio*20;
  
  if((goal.week+0) == goalStatus['week']&& goal.goal == 0){
      totalPercentage = totalPercentage + currentpercentage;
  
  }

  }
  
  if(goal.goal == 1){
      totalPercentage = 0;
  }

  console.log(currentpercentage,totalPercentage);
  return {
    currentpercentage,
     totalPercentage
    };
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
  