var express = require('express');
var router = express.Router();

var api = require('./api')
const tutorDao = require('../dao/tutor.dao')


router.get('/', async (req, res, next) => {
  const subject = req.params.subject
  const level = req.params.level
  const tutors = await tutorDao.search(subject, level)
  const searches = tutors.map((t) => {
    return {
      id: t._id,
      teachingSubjects: t.teachingSubjects,
      teachingLevels: t.teachingLevels,
      price: t.price,
      name: t.user.name,
      avatarUrl: t.user.avatarUrl
    }
  })
  api.ok(res, searches)
});


module.exports = router;
