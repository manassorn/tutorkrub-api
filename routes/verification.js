var express = require('express');
var router = express.Router();

var verificationController = require('../controllers/verification.controller')
var api = require('./api')

router.post('/email', function(req, res, next) {
  verificationController.verifyEmail(req.body.email)
  api.responseOk(res)
});

module.exports = router;
