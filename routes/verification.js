var express = require('express');
var router = express.Router();

var verificationController = require('../controllers/verification.controller')
var api = require('./api')

router.post('/email/create', async function(req, res, next) {
  try {
    await verificationController.createForEmail(req.body.email)
    api.responseOk(res)
  } catch (e) {
    next(e)
  }
});

router.post('/email/verify', async function(req, res, next) {
  try {
    const verifyPassed = await verificationController.verifyForEmail(req.body.email, req.body.code)
    api.responseOk(res, {verifyPassed})
  } catch (e) {
    next(e)
  }
});

module.exports = router;
