var express = require('express');
var router = express.Router();

var api = require('./api')
const loginAccountDao = require('../dao/LoginAccountDao')
const userDao = require('../dao/UserDao')

router.post('/', async (req, res, next) => {
  const title = 
  await loginAccountDao.create(req.body.loginAccount)
  await userDao.create(req.body.user)

  api.ok(res)

});


module.exports = router