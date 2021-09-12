var express = require('express');
var router = express.Router();

var api = require('./api')
const loginAccountDao = require('../dao/LoginAccountDao')
const userDao = require('../dao/users.dao')

router.post('/', async (req, res, next) => {
  const user = await userDao.create(req.body.user)
  const loginAccount = req.body.loginAccount
  loginAccount.user = user.id

  await loginAccountDao.create(loginAccount)

  api.ok(res)

});


module.exports = router