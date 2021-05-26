var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var userController = require('../controllers/user.controller')
var firestoreService = require('../services/firestore.service')
var admin = require('firebase-admin')
var format = require('date-fns-tz')

router.get('/:appointmentId/message', async (req, res, next) => {
  // todo - check weather user is tutor or student
  const appointmentId = req.params.appointmentId
  let messages = await crudController.readSub('Appointments', appointmentId, 'Messages')
  if(messages.length > 0) {
  const userIds = messages.map(m => m.from)
  const users = await crudController.whereIdIn('Users', userIds)
  const userMap = crudController.listToMap(users, 'id')
  messages = messages.map(m => {
    //m.timestamp = m.timestamp.toDate()
    m.fromAvatarUrl = userMap[m.from].avatarUrl
    m.fromName = userMap[m.from].name
    return m
  })
  }
  
  api.responseOk(res, messages)
})

router.post('/:appointmentId/message', async (req, res, next) => {
  // todo - check weather user is tutor or student
  const userId = req.user.id  
  const appointmentId = req.params.appointmentId
  const payload = {
    timestamp: new Date(),
    text: req.body.text,
    from: userId
  }
  const appointment = await crudController.createSub('Appointments', appointmentId, 'Messages', payload)
  api.responseOk(res, appointment)
})

router.post('/course/:courseId', async (req, res, next) => {
  const studentId = req.user.id  
  const courseId = req.params.courseId
  const startTime = req.body.startTime
  const length = req.body.length
  
  const course = await crudController.readById('Courses', courseId)
  const tutorId = course.tutorId
  const payload = {
    courseId, startTime, length, tutorId, studentId, 
    status: 'to_be_paid' //to_be_accepted, to_be_started, complete
  }
  const appointment = await crudController.create('Appointments', payload)
  
  api.responseOk(res, appointment)
  
});

router.get('/teach', async (req, res, next) => {
  var userId = req.user.id
  var status = req.params.status

  const appointments = await crudController.readBy2('Appointments','tutorId',userId,'status',status)
  return appointments
})

router.get('/study', async (req, res, next) => {
  var userId = req.user.id
  var status = req.query.status
  
  var appointments = await crudController.readBy2('Appointments','studentId',userId,'status',status)

  const courseIdList = appointments.map(a => a.courseId)
  var courses = await crudController.whereIdIn('Courses', courseIdList)
  
  const tutorIdList = appointments.map(a => a.tutorId)
  const tutors = await userController.getByIdList(tutorIdList)
  
  appointments = crudController.join(appointments, courses, 'courseId', 'id', {'courseTitle': 'title'})
  
  appointments = crudController.join(appointments, tutors, 'tutorId', 'id', {'tutorName': 'name', 'tutorAvatarUrl':'avatarUrl'})
  
  api.responseOk(res, appointments)
  
})

module.exports = router