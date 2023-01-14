const path = require("path");
var express = require('express');


const cors = require('cors');
var cookieParser = require('cookie-parser');
// var session = require('express-session');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout')
var logger = require('morgan');
var responseTime = require('response-time')

var jwtMiddleware = require('../middlewares/jwt.middleware')
var monitoringMiddleware = require('../middlewares/monitoring.middleware')
var monitoring = require('../monitoring')

var indexRouter = require('../routes/index');
var authenRouter = require('../routes/authen');
var usersRouter = require('../routes/users');
var adminRouter = require('../routes/admin');
var tutorsRouter = require('../routes/tutors');
var uploadRouter = require('../routes/upload');
var payRouter = require('../routes/pay');
var paymentsRouter = require('../routes/payments');
var coursesRouter = require('../routes/courses');
var appointmentsRouter = require('../routes/appointments');
var registerRouter = require('../routes/register');
var omiseRouter = require('../routes/omise');
var searchRouter = require('../routes/search');
var favoritesRouter = require('../routes/favorites');



var app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors({exposedHeaders:'accessTokenDev'}))
app.options('*', cors({exposedHeaders:'accessTokenDev'}))

app.use(timeout('1s'));
app.use(logger('dev'));
app.use(responseTime(monitoringMiddleware.logResponseTime))
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

// app.use(express.static(path.join(__dirname, '../public')));

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(jwtMiddleware.extractUser);

app.use('/', indexRouter);
app.use('/api/authen', authenRouter);
app.use('/api/users', usersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/tutors', jwtMiddleware.checkLogin, tutorsRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/pay', payRouter);
app.use('/api/payments', paymentsRouter);

app.use('/api/courses', jwtMiddleware.checkLogin, coursesRouter);
app.use('/api/appointments', jwtMiddleware.checkLogin, appointmentsRouter);
app.use('/api/register', registerRouter);
app.use('/api/omise', omiseRouter);
app.use('/api/search', searchRouter);
app.use('/api/favorites', jwtMiddleware.checkLogin, favoritesRouter);

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

app.use(errorHandler)

function errorHandler(err, req, res, next) {
  let details = ""
  if (err instanceof Error) {
    details = err.stack
  } else if(typeof err === 'object') {
    details = JSON.stringify(err, null, 4) // beautiful indented output.
  } else {
    details = err
  }
  monitoring.error(`Express error at root level on ${req.method} ${req.originalUrl} ${details}`)
  res.status(500).send('Something broke!')
}

module.exports = app;