var jwt = require('jsonwebtoken')
var api = require('../routes/api')
module.exports.extractUser = (req, res, next) => {
  
  
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (!err) {
              req.user = user;
            }
        });
    }
    const accessTokenDev = req.cookies['accesstoken']
    if(accessTokenDev) {
      jwt.verify(accessTokenDev, process.env.TOKEN_SECRET, (err, user) => {
        if (!err) {
          req.user = user;
          req.user.id = user.userId
        }
      });
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