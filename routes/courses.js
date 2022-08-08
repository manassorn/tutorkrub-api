var express = require('express');
var router = express.Router();

var api = require('./api')
var coursesController = require('../controllers/courses.controller')

router.post('/', async (req, res, next) => {
  const data = req.body
  data.tutor = req.user.id
  const course = await coursesController.create(data)

  api.ok(res, course)

});

router.get('/', async (req, res, next) => {
  const courses = await coursesController.getListByOwner(req.user.id)

  api.ok(res, courses)
});

router.put('/:courseId', async (req, res, next) => {
  const course = await coursesController.findByIdAndUpdate(req.params.courseId, req.body)

  api.ok(res, course)

});

router.get('/:id', async (req, res, next) => {
  const course = await coursesController.get(req.params.id)
    console.log(course)

  api.responseOk(res, course)
});

module.exports = router