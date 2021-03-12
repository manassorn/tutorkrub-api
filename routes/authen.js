var jwt = require('jsonwebtoken')
var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var userController = require('../controllers/user.controller')


router.post('/login', async (req, res, next) => {
  const user = await userController.getUserByEmailPassword(req.body.email, req.body.password)
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {expiresIn: 60});
    res.cookie('accesstoken', accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true })
    api.responseOk(res, {accessToken})
  } else {
    api.responseError(res, 'login not success')
  }
});

router.get('/1clicklogin', async (req, res, next) => {
  const accessToken = jwt.sign({ userId: 'hNqOKzYwhJjZTIDLUkf5' }, process.env.TOKEN_SECRET, {expiresIn: 60});
  res.cookie('accesstoken', accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true })
  api.responseOk(res, {accessToken})
});

router.get('/session', async (req, res, next) => {
  api.responseOk(res,req.session)
});

router.post('/logout', async (req, res, next) => {
  req.user = null
  api.responseOk(res)
});



module.exports = router;

module.exports.authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};