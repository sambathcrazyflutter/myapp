require('dotenv/config');
const jwt = require("jsonwebtoken");

var path = require('path');
var mysql = require('mysql');
let fs = require('fs');

let config = require('./config.js');

var dateFormat = require('dateformat');

let connection = mysql.createConnection(config);

function generateRefreshToken(user){
  return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn : '50s'});
 
}

function generateAccessToken(user){
return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {
  expiresIn: '30s'
});
}


exports.login =  function(request, response, next) {
  var email = request.body.email;
  var password = request.body.password;

 connection.query('call validateLogin( ?, ? )',[ email , password ],(error, results, fields) => {
  if (error) {
    response.status(203).send({"error": true,
    "tasks":error.message});	
        return console.error(error.message);
      }


      
      let ts = Date.now();
      let date_ob = new Date(ts);
      let date = date_ob.getDate();
      let month = date_ob.getMonth() + 1;
      let year = date_ob.getFullYear();

          var day_o = year + "_" + month + "_" + date ;
          var dir = 'Request_response_data/'+day_o+'/loginDetail';
          mkdir(dir);
      fs.appendFile('./Request_response_data/'+day_o+'/loginDetail/loginDetail.txt', JSON.stringify(results, null, 4), function (err) {
      if (err) return console.log(err);
      console.log('output generated');
      });
  
      if( results.length > 0){
        if( results[0][0].exist ){

    
          var user = new Object();
          var api_key = "Bearer ";
          user.uid = results[0][0]["uid"];
          user.name = results[0][0]["username"];
          user.email = results[0][0]["email"];
          const accesstoken = generateAccessToken(user);
       //   const refreshtoken = generateRefreshToken(user);      
          api_key = api_key + accesstoken;



          const token = api_key.split(' ')[1];
          const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
          );
          request.userData = decoded;
         


          response.status(200).send({"error": false,
         "apikey":api_key});			
    
          }else{
           response.status(200).send({"error": true,
          "tasks":[]});	
          }


     }else{
      response.status(203).send({"error": true,
     "tasks":[]});	
     }
      

    
      response.end();
    });
};


exports.getKey =  function(request, response, next) {
  var email = request.params['email'] ;
   
  let sql = `SELECT uid,username,email,api_key from user WHERE email = ? `;
  connection.query(sql,[email],(error, results, fields) => {
  
      if (error) {
        response.status(203).send({"error": false,
        "tasks":error.message});
        return console.error(error.message);
      }
      if (results.length > 0) {
           
                var tmp = new Object();
                var api_key = "Bearer ";
                tmp.uid = results[0]["uid"];
                tmp.name = results[0]["username"];
                tmp.email = results[0]["email"];
                api_key = api_key + jwt.sign(tmp,process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn: '1d'
                });
            
              
                const token = api_key.split(' ')[1];
                const decoded = jwt.verify(
                  token,
                  process.env.ACCESS_TOKEN_SECRET
                );
                request.userData = decoded;
               
  
        response.status(200).send({"error": false,
         "apikey":api_key});
      } else {
        response.status(203).send({"error": true,
        "tasks":[]});
      }			
      response.end();
    });
};


// Display login page.
  exports.loginHome =  function(req, res, next) {
    res.sendFile(path.join(__dirname + '/login.html'));
  };


  exports.auth =  function(request, response, next) {
    // console.log(request.query.username);
    // console.log(request.body.username);
    console.log('body: ', request.body)
    console.log('query: ', request.query)
    var tmp = request.body;
    var username = tmp.username;
    var password = tmp.password;
    if (username && password) {


      let sql = `SELECT * FROM accounts WHERE username = ? AND password = ?`;
      connection.query(sql, [username, password],(error, results, fields) => {
       if (results.length > 0) {
         request.session.loggedin = true;
         request.session.username = username;
         response.redirect('/home');
       } else {
         response.send('Incorrect Username and/or Password!');
       }
       response.end();
       });

    } else {
      response.send('Please enter Username and Password!');
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
  