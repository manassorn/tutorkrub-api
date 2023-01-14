var express = require('express');
var router = express.Router();

var api = require('./api')
var monitoring = require('../monitoring')
const tutorDao = require('../dao/tutor.dao')
const courseDao = require('../dao/course.dao')


router.get('/tutors', async (req, res, next) => {
  const subject = req.query.subject
  const level = req.query.level
  const tutorId = req.query.id
  if (tutorId) {
    const tutor = await tutorDao.get(tutorId)
    api.ok(res, tutor?[mapTutor(tutor)]:[])
  } else {

    const tutors = await tutorDao.search(subject, level)
    const searches = tutors.map((t) => {
      if (t.user) {
        return {
          id: t._id,
          teachSubjects: t.teachSubjects,
          teachLevels: t.teachLevels,
          availability: t.availability,
          krubId: t.user.krubId,
          avatarUrl: t.user.avatarUrl,
          name: t.user.name
        }
      } else {
        return {
          id: t._id,
          teachSubjects: t.teachSubjects,
          teachLevels: t.teachLevels,
          availability: t.availability,
          krubId: undefined,
          avatarUrl: undefined,
          name: t.name
        }
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
    avatarUrl: t.user.avatarUrl,
    name: t.user.name
  }
}

router.get('/courses', async (req, res, next) => {
  const courseId = req.query.id
  const tutorId = req.query.tutorid

  if (courseId) {
    const course = await courseDao.get(courseId)
    api.ok(res, [course])
  } else if(tutorId) {
    const courses = await courseDao.findByTutorId(tutorId)
    api.ok(res, courses)
  }


});


module.exports = router;
