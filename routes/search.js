var express = require('express');
var router = express.Router();

var api = require('./api')
const tutorsDao = require('../dao/tutors.dao')


router.get('/', async (req, res, next) => {
  const subject = req.params.subject
  const level = req.params.level
  const tutors = await tutorsDao.search(subject, level)
  const searches = tutors.map((t) => {
    t.name = t.user.name;
    t.avatarUrl = t.user.avatarUrl;
    delete t.user;
    return 'a';
  })
  api.ok(res, searches)
});


module.exports = router;
