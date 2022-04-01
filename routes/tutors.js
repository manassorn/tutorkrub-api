var express = require('express');
var router = express.Router();

var api = require('./api')
const tutorsDao = require('../dao/tutors.dao')


router.post('/', async (req, res, next) => {
  const tutor = req.body
  tutor.userId = req.user.id
  await tutorsDao.create(tutor)
  api.ok(res)
});

router.put('/', async (req, res, next) => {
  const tutor = req.body
  tutor.userId = req.user.id
  await tutorsDao.findByIdAndUpdate(tutor)
  api.ok(res)
});

module.exports = router;
