var jwt = require('jsonwebtoken')
var api = require('../routes/api')
module.exports.extractUser = (req, res, next) => {
  

    if(process.env.ENV == 'dev') {
      const accessToken = req.headers.accesstoken;
      if (accessToken) {
        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
          if (!err) {
            req.user = user;
            req.user.id = user.userId
          }
        });
      }
    } else {
      const accessToken = req.cookies['accesstoken']
      if(accessToken) {
        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
          if (!err) {
            req.user = user;
            req.user.id = user.userId
          }
        });
      }
    }
    next()
};

module.exports.checkLogin = (req, res, next) => {
  if(!req.user) {
    api.responseUnauthorized(res)
  } else {
    next()
  }
}