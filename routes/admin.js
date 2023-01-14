var express = require('express');
var router = express.Router();

var api = require('./api')
const tutorDao = require('../dao/tutor.dao')

router.post('/tutor', async (req, res, next) => {
  const tutor = req.body
  await tutorDao.create(tutor)
  api.ok(res)
});

module.exports = router;
