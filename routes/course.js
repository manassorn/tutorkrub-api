var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var courseController = require('../controllers/course.controller')



router.post('/', async (req, res, next) => {
  const title = req.body.title
  const description = req.body.description
  const price = req.body.price
  const category = req.body.category
  const tutorId = req.user.userId
  
  const payload = {title, description, price, category, tutorId}
  
  const course = await crudController.create('course', payload)
  
  api.responseOk(res, course)
  
});

router.get('/list', async (req, res, next) => {
  var courses = await courseController.list()
  api.responseOk(res, courses)
});

router.get('/:id', async (req, res, next) => {
  var id = req.params.id
  var course = await courseController.get(id)
  api.responseOk(res, course)
});

module.exports = router