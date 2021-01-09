var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(verificationController.verifyForEmail(req.body.email, req.body.code)) {
    const payload = {
      email: req.body.email,
      name: req.body.
    }
    crud.create('user', payload)
  }
  res.send('respond with a resource');
});

module.exports = router;
