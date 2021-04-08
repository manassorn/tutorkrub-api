var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var userController = require('../controllers/user.controller')
var firestoreService = require('../services/firestore.service')
var admin = require('firebase-admin')

router.get('/:appointmentId/message', async (req, res, next) => {
  // todo - check weather user is tutor or student
  const appointmentId = req.params.appointmentId
  let messages = await crudController.readSub('appointment', appointmentId, 'message')
  if(messages.length > 0) {
  const userIds = messages.map(m => m.from)
  const users = await crudController.whereIdIn('user', userIds)
  const userMap = crudController.listToMap(users, 'id')
  messages = messages.map(m => {
    m.fromAvatarUrl = userMap[m.from].avatarUrl
    m.fromName = userMap[m.from].name
    return m
  })
  }
  
  api.responseOk(res, messages)
})

router.post('/:appointmentId/message', async (req, res, next) => {
  // todo - check weather user is tutor or student
  const userId = req.user.userId  
  const appointmentId = req.params.appointmentId
  const payload = {
    timestamp: new Date(),
    text: req.body.text,
    from: userId
  }
  const appointment = await crudController.createSub('appointment', appointmentId, 'message', payload)
  api.responseOk(res, appointment)
})

router.post('/course/:courseId', async (req, res, next) => {
  const studentId = req.user.userId  
  const courseId = req.params.courseId
  const startTime = req.body.startTime
  const length = req.body.length
  
  const course = await crudController.readById('course', courseId)
  const tutorId = course.tutorId
  const payload = {
    courseId, startTime, length, tutorId, studentId, 
    status: 'to_be_paid' //to_be_accepted, to_be_started, complete
  }
  const appointment = await crudController.create('appointment', payload)
  
  api.responseOk(res, appointment)
  
});

router.get('/tutor/status/:status', async (req, res, next) => {
  const snapshot = await firestoreService.firestore.collection('appointment').where('tutorId', '==', req.user.userId).where('status', '==', req.params.status).get()
  
  const appointments = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
  return appointments;
})

router.get('/student/status/:status', async (req, res, next) => {
  let snapshot = await firestoreService.firestore.collection('appointment').where('studentId', '==', req.user.userId).where('status', '==', req.params.status).get()
  let appointments = firestoreService.toList(snapshot)

  const courseIdList = appointments.map(a => a.courseId)
  
  snapshot = await firestoreService.firestore.collection('course').where(admin.firestore.FieldPath.documentId(), 'in', courseIdList).get()
  var courses = firestoreService.toList(snapshot)
  const courseMap = {}
  courses.map(c => {
    courseMap[c.id] = c.title
  })
  
  const tutorIdList = appointments.map(a => a.tutorId)
  
  const tutors = await userController.getByIdList(tutorIdList)
  const tutorMap = {}
  tutors.map(t => {
    tutorMap[t.id] = {name: t.name, avatarUrl: t.avatarUrl}
  })
  
  
  appointments = appointments.map(a => {
    a.courseName = courseMap[a.courseId]
    a.tutorName = tutorMap[a.tutorId].name
    a.tutorAvatarUrl = tutorMap[a.tutorId].avatarUrl
    return a
  })
  
  api.responseOk(res, appointments)
  
})

module.exports = router