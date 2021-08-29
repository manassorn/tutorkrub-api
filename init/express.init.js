const path = require("path");
var express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
// var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');

var jwtMiddleware = require('../middlewares/jwt.middleware')

var indexRouter = require('../routes/index');
var authenRouter = require('../routes/authen');
var usersRouter = require('../routes/user');
var crudRouter = require('../routes/crud');
var uploadRouter = require('../routes/upload');
var verificationRouter = require('../routes/verification');
var payRouter = require('../routes/pay');
var exploreRouter = require('../routes/explore');
var coursesRouter = require('../routes/courses');
var appointmentsRouter = require('../routes/appointments');
var registerRouter = require('../routes/register');



var app = express();

app.use(cors({exposedHeaders:'accessTokenDev'}))
app.options('*', cors({exposedHeaders:'accessTokenDev'}))

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

app.use(express.static(path.join(__dirname, '../public')));

app.use(jwtMiddleware.extractUser);

app.use('/', indexRouter);
app.use('/api/authen', authenRouter);
app.use('/api/user', usersRouter);
//app.use('/api/crud', crudRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/verification', verificationRouter);
app.use('/api/pay', payRouter);

app.use('/api/explore', exploreRouter);
app.use('/api/courses', jwtMiddleware.checkLogin, coursesRouter);
app.use('/api/appointments', jwtMiddleware.checkLogin, appointmentsRouter);
app.use('/api/register', registerRouter);

app.get('*', function(req,res) {
  res.sendFile(path.resolve(path.join(__dirname, '../public', 'index.html')))
});
// app.get('/user', express.static(path.join(__dirname, 'public') + '/index.html'));


app.set('json replacer', function(key, value) {
  const format = require('date-fns-tz/format')
  if (this[key] && this[key]._seconds) {
    // Your own custom date serialization
    value = new Date(this[key]._seconds*1000)
    value = format(value, "yyyy-MM-dd'T'HH:mm:ssXXX", {timeZone:'Asia/Bangkok'})
  }

  return value;
});

module.exports = app;