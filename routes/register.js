var express = require('express');
var router = express.Router();

var api = require('./api')
const loginAccountDao = require('../dao/LoginAccountDao')
const userDao = require('../dao/users.dao')

router.post('/', async (req, res, next) => {
  const loginAccount = req.body.loginAccount
  const existingEmail = await loginAccountDao.getByEmail(loginAccount.email)
  if (existingEmail) {
    api.responseError(res, "The email address already exists")
    return
  }
  if (req.body.user) {
    const user = await userDao.create(req.body.user)

    loginAccount.user = user.id

    await loginAccountDao.create(loginAccount)
  } else {
    await loginAccountDao.create(loginAccount)
  }

  api.ok(res)

});

router.post('/checkemail', async (req, res, next) => {
  const email = req.body
  const existingEmail = await loginAccountDao.getByEmail(email)
  if (existingEmail) {
    api.responseError(res, "The email address already exists")
  } else {
    api.ok(res)
  }
});


module.exports = router