var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  if(verificationController.verifyForEmail(req.body.email, req.body.code)) {
    const payload = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    }
    crud.create('user', payload)
  }
  res.send('respond with a resource');
});

module.exports = router;
