var express = require('express');
var router = express.Router();

var api = require('./api')
const loginAccountDao = require('../dao/LoginAccountDao')
const userDao = require('../dao/user.dao')
const tutorDao = require('../dao/tutor.dao')
const {ERROR_EMAIL_ALREADY_EXISTS, ERROR_KRUBID_ALREADY_EXISTS} = require('../errors')

router.post('/', async (req, res, next) => {
  const loginAccount = req.body.loginAccount
  const existingEmail = await loginAccountDao.getByEmail(loginAccount.email)
  const existingUser = await userDao.getByKrubId(req.body.user.krubId)
  if (existingEmail || existingUser) {
    api.responseCustomError(res, ERROR_KRUBID_ALREADY_EXISTS)
    return
  }

  const user = await userDao.create(req.body.user)
  loginAccount.user = user.id
  await loginAccountDao.create(loginAccount)

  api.ok(res)

});

router.post('/tutor', async (req, res, next) => {
  const existingEmail = await loginAccountDao.getByEmail(req.body.email)
  const existingUser = await userDao.getByKrubId(req.body.krubId)
  if  (existingEmail) {
    api.responseCustomError(res,ERROR_EMAIL_ALREADY_EXISTS)
    return
  }
  if (existingUser) {
    api.responseCustomError(res,ERROR_KRUBID_ALREADY_EXISTS)
    return
  }

  const user = await userDao.create({krubId: req.body.krubId})

  await tutorDao.create({
    teachSubjects: req.body.teachSubjects,
    teachLevels: req.body.teachLevels,
    tutorPrice: req.body.tutorPrice,
    user: user.id
  })

  await loginAccountDao.create({
    email: req.body.email,
    password: req.body.password,
    user: user.id
  })

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

router.post('/checkkrubid', async (req, res, next) => {
  const krubId = req.body.krubId
  const existingUser = await userDao.getByKrubId(krubId)
  if (existingUser) {
    api.ok(res, {exists: true})
  } else {
    api.ok(res, {exists: false})
  }
});


module.exports = router