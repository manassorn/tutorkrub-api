var express = require('express');
var router = express.Router();

var api = require('./api')
const tutorDao = require('../dao/tutor.dao')


router.post('/', async (req, res, next) => {
  const tutor = req.body
  tutor.user = req.user.id
  await tutorDao.create(tutor)
  api.ok(res)
});

router.put('/', async (req, res, next) => {
  const tutor = req.body
  tutor.userId = req.user.id
  await tutorDao.findByIdAndUpdate(tutor)
  api.ok(res)
});

module.exports = router;
