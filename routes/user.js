var express = require('express');
var router = express.Router();

var api = require('./api')
var verificationController = require('../controllers/verification.controller')
var crudController = require('../controllers/crud.controller')
var userController = require('../controllers/user.controller')

router.post('/', async(req, res, next) => {
  var passed = await verificationController.verifyForEmail(req.body.email, req.body.code)
  if(passed === false) {
    api.responseError('code is incorrect')
    return false
  }
  const payload = {
    email: req.body.email,
    name: req.body.name,
    password: req.body.password
  }
  await crudController.create('user', payload)
  api.responseOk(res)
});

router.post('/login', async (req, res, next) => {
  const success = await userController.login(req.body.email, req.body.password)    
  if (success) {
      api.responseOk(res)
  } else {
    api.responseError(res, 'login not success')
  }
});

router.post('/1clicklogin', async (req, res, next) => {
  req.session.meId = 'hNqOKzYwhJjZTIDLUkf5'
  api.responseOk(res)
});

router.post('/logout', async (req, res, next) => {
  req.session.meId = undefined
  api.responseOk(res)
});


router.post('/:id/password', async (req, res, next) => {
  const user = await crudController.readById('user', req.params.id)
  console.log('user.password',user.password)
  console.log('req.body.currentPassword',req.body.currentPassword)
  if (user.password == req.body.currentPassword) {
    crudController.update('user', req.params.id, {password: req.body.newPassword})
    api.responseOk(res)
  } else {
    api.responseError400(res, 'current password is incorrect')
  }
});


router.post('/:id/email', async (req, res, next) => {
  var passed = await verificationController.verifyForEmail(req.body.email, req.body.code)
  if (passed === false) {
    api.responseError(res,'code is incorrect')
    return false
  }
  const payload = {
    email: req.body.email
  }
  await crudController.update('user', req.params.id, payload)
  api.responseOk(res)
});

router.get('/me', async (req, res, next) => {
  //var meId = req.sessions.meId
  if(req.session.meId) {
    const meId = req.session.meId
    const user = await crudController.readById('user', meId)
    api.responseOk(res, user)
  } else {
    api.responseError(res, 'no auth')
  }
});

module.exports = router;
