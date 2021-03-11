var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var firestoreService = require('../services/firestore.service')


router.post('/course/:id', async (req, res, next) => {
  const courseId = req.params.courseId
  const course = await crudController.readById(courseId)
  const tutorId = course.tutorId
  const studentId = req.user.userId
  const payload = {
    courseId, startTime, length, tutorId, studentId, 
    status: 'to_be_paid' //to_be_accepted, to_be_started, complete
  }
  const appointment = await crudController.create('appointment', payload)
  
  api.responseOk(res, appointment)
  
});

router.get('tutor/status/:status', (req, res, next) => {
  const
  const snapshot = await firestore.firestore.collection('appointment').where('tutorId', '==', req.user.userId).where('status', '==', req.params.status).get()
  
  const appointments = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
  return appointments;
})

router.get('student/status/:status', (req, res, next) => {
  const
  const snapshot = await firestore.firestore.collection('appointment').where('studentId', '==', req.user.userId).where('status', '==', req.params.status).get()

  const appointments = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
  return appointments;
})