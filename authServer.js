require("dotenv").config();
const express = require("express");
const appAuth = express();
const jwt = require("jsonwebtoken");
//  require('crypto').randomBytes(64).toString('hex')
appAuth.use(express.json());

let refreshtokens = [];

appAuth.post("/token",(req,res)=>{
           const refreshtoken = req.body.token;
           console.log(refreshtoken);
           console.log(refreshtokens);
           if(refreshtoken == null){ res.sendStatus(401);}
            if( !refreshtokens.includes(refreshtoken)) return res.sendStatus(403);
           jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
            if(err) return res.sendStatus(403);
            console.log(user.name);
            const accesstoken = generateAccessToken({ name : user.name });
            res.send({accesstoken : accesstoken});
       
        });
});

appAuth.post("/login",(req,res)=>{
// Authenticate user
    const username = req.body.username;
    const user = { name : username };
    const accesstoken = generateAccessToken(user);
    const refreshtoken = generateRefreshToken(user);
    refreshtokens.push(refreshtoken);
    console.log(refreshtokens);
    console.log({accesstoken : accesstoken , refreshtoken : refreshtoken });
  //  res.send({accesstoken : accesstoken , refreshtoken : refreshtoken });
    res.redirect('http://localhost:3000/calllog?uid=736c47e1770a6f9e04bd7fa9676227');
  //  res.redirect('/me');
});

appAuth.delete("/logout",(req,res)=>{
    refreshtokens = refreshtokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
});


appAuth.get('/me', verifyToken, function(req, res, next) {

    res.status(200).send(req.userId);
  });


  function generateRefreshToken(user){
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn : '50s'});
   
}

function generateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET);
}



function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
      
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
      // if everything good, save to request for use in other routes
      req.userId = decoded.name;
      next();
    });
  }
  
  appAuth.listen(4000);