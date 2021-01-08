require('dotenv/config');
const jwt = require("jsonwebtoken");
const { user } = require('../controllers/config');




function verifyapiKey(request, response, next) {
  var undef;

// Fails on undefined variables
// And even fails on null values
if (request.headers['authorization'] !== undef && request.headers['authorization'] != undef ) {

  const token= request.headers['authorization'].split(' ')[1];
  
  if (!token)
      return response.status(400).send({ auth: false, message: 'Login again' , statusCode : 6 });
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err)
         { 


          if(err.message.toString().trim() === "invalid token")
          {
            return response.status(401).send({ auth: false, message: 'User not exist Login Again' , statusCode : 4 });
          }

          if(err.message.toString().trim() === "jwt expired")
          {
            return response.status(403).send({ auth: false, message: 'Time out Login again' , statusCode : 5 });
     
          }

       }
        console.log(decoded);
        if( decoded.uid !== undef && decoded.uid != undef )
           {
            request.user = decoded;
             next();
           }
           else{
             response.end();
           }
      });
 
}else{

  return response.status(400).send({ auth: false, message: 'autherisation not provided in choper url' , statusCode : 7  });
     
} 
  }
    
    module.exports = verifyapiKey;