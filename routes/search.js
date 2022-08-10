var express = require('express');
var router = express.Router();

var api = require('./api')
const tutorDao = require('../dao/tutor.dao')
const courseDao = require('../dao/course.dao')


router.get('/tutors', async (req, res, next) => {
  const subject = req.params.subject
  const level = req.params.level
  const tutorId = req.query.id
  if (tutorId) {
    const tutor = await tutorDao.get(tutorId)
    api.ok(res, [mapTutor(tutor)])
  } else {

    const tutors = await tutorDao.search(subject, level)
    const searches = tutors.map((t) => {
      return {
        id: t._id,
        teachSubjects: t.teachSubjects,
        teachLevels: t.teachLevels,
        availability: t.availability,
        krubId: t.user.krubId,
        avatarUrl: t.user.avatarUrl
      }
    })
    api.ok(res, searches)
  }

});

function mapTutor(t) {
  //this should only return public data
  return {
    id: t._id,
    teachSubjects: t.teachSubjects,
    teachLevels: t.teachLevels,
    availability: t.availability,
    krubId: t.user.krubId,
    avatarUrl: t.user.avatarUrl
  }
}

router.get('/courses', async (req, res, next) => {
  const courseId = req.query.id
  if (courseId) {
    const course = await courseDao.get(courseId)
    api.ok(res, [course])
  }


});


module.exports = router;
