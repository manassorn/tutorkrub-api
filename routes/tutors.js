var express = require('express');
var router = express.Router();

var api = require('./api')
const tutorDao = require('../dao/tutor.dao')


router.post('/', async (req, res, next) => {
  if (req.params.byadmin == "true") {
    const tutor = req.body
    await tutorDao.create(tutor)
    api.ok(res)
  } else {
    const tutor = req.body
    tutor.user = req.user.id
    await tutorDao.create(tutor)
    api.ok(res)
  }
});

router.put('/', async (req, res, next) => {
  const tutor = req.body
  await tutorDao.findByUserIdAndUpdate(req.user.id, tutor)
  api.ok(res)
});

router.get('/', async (req, res) => {
  const tutor = await tutorDao.getByUserId(req.user.id)
  api.ok(res, tutor)
})

module.exports = router;
