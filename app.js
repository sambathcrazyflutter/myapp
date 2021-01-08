var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require("node-cron");
let nodemailer = require("nodemailer");
//require('./ftpServer');



var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var usersRouter = require('./routes/users');
var allContactsRouter = require('./routes/allContacts');
var eightBasicRouter = require('./routes/t8basic');
var relationRouter = require('./routes/relation');
var goalRouter = require('./routes/goal');
var one108Router = require('./routes/one108');
var profileRouter = require('./routes/profile');
var detailsRouter = require('./routes/details');
var callLogRouter = require('./routes/calllog');
var trackingRouter = require('./routes/tracking');
var timingDetailsRouter = require('./routes/timingDetails');
var transactionRouter = require('./routes/transaction');

//const Common = require('./routes/commonFunction');

require('dotenv/config');

require('./authServer');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/auth', indexRouter);
app.use('/home', homeRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

app.use('/transaction', transactionRouter);
app.use('/allcontacts', allContactsRouter);
app.use('/eightbasics', eightBasicRouter);
app.use('/relationship', relationRouter);
app.use('/goal', goalRouter);
app.use('/details', detailsRouter);
app.use('/profile', profileRouter);
app.use('/calllog', callLogRouter);
app.use('/one108', one108Router); 
app.use('/getTrackingList', trackingRouter); 
app.use('/getTimingDetails', timingDetailsRouter); 

//var cf = new Common;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true 
},()=> console.log("db connected mongo"));


module.exports = app;


