var express = require('express');
var router = express.Router();

var verificationController = require('../controllers/verification.controller')
var api = require('./api')

router.post('/email', async function(req, res, next) {
  try {
    await verificationController.verifyEmail(req.body.email)
    api.responseOk(res)
  } catch (e) {
    next(e)
  }
});

module.exports = router;
