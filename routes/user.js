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

module.exports = router;
