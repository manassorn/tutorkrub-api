var express = require('express');
var router = express.Router();

var api = require('./api')
var coursesController = require('../controllers/courses.controller')

router.get('/', async (req, res) => {
  var courses = await coursesController.getAll()
  api.ok(res, courses)
})



module.exports = router;