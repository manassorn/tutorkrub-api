const dotenv = require("dotenv");

// get config vars
dotenv.config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authenRouter = require('./routes/authen');
var usersRouter = require('./routes/user');
var crudRouter = require('./routes/crud');
var uploadRouter = require('./routes/upload');
var verificationRouter = require('./routes/verification');

var app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.multipart());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// var sess = {
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {}
// }
/*if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}*/
// app.use(session(sess))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/authen', authenRouter);
app.use('/api/user', usersRouter);
app.use('/api/crud', crudRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/verification', verificationRouter);

module.exports = app;
