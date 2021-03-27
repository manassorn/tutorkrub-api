var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var firestoreService = require('../services/firestore.service')
var admin = require('firebase-admin')


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
    courseMap[c.id] = c.name
  })
  
  appointments = appointments.map(a => {
    a.courseName = courseMap[a.courseId]
    return a
  })
  
  api.responseOk(res, appointments)
  
})

module.exports = router