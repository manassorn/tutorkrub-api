var express = require('express');
var router = express.Router();

var api = require('./api')
var coursesController = require('../controllers/courses.controller')

router.get('/', async (req, res) => {
  var courses = await crudController.read('Courses')
  courses = await crudController.joinById(courses,'Users','tutorId','id',{'tutorAvatarUrl':'avatarUrl'})
  api.ok(res, courses)
})



module.exports = router;