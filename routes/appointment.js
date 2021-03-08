var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var userController = require('../controllers/user.controller')


router.post('/course/:id', async (req, res, next) => {
  const userId = req.user.userId
  const courseId = req.params.courseId
  const payload = {
    courseId, startTime, length, 
    status: 'to_be_paid', //to_be_accepted, to_be_started, complete
    teacherId: userId,
    studentId: userId
  }
  const appointment = await crudController.create('appointment', payload)
  
  api.responseOk(res, appointment)
  
});