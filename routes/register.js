var express = require('express');
var router = express.Router();

var api = require('./api')
const loginAccountDao = require('../dao/LoginAccountDao')
const userDao = require('../dao/users.dao')
const {ERROR_KRUBID_ALREADY_EXISTS} = require('../errors')

router.post('/', async (req, res, next) => {
  const loginAccount = req.body.loginAccount
  const existingEmail = await loginAccountDao.getByEmail(loginAccount.email)
  if (req.body.user) {
    const existingUser = await userDao.getByKrubId(req.body.user.krubId)
    if (existingEmail || existingUser) {
      api.responseCustomError(res, ERROR_KRUBID_ALREADY_EXISTS)
      return
    }
    const user = await userDao.create(req.body.user)

    loginAccount.user = user.id

    await loginAccountDao.create(loginAccount)
  } else {
    await loginAccountDao.create(loginAccount)
  }

  api.ok(res)

});

router.post('/checkemail', async (req, res, next) => {
  const email = req.body.email
  const existingEmail = await loginAccountDao.getByEmail(email)
  if (existingEmail) {
    api.ok(res, {exists: true})
  } else {
    api.ok(res, {exists: false})
  }
});


module.exports = router