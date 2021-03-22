var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var firestoreService = require('../services/firestore.service')


router.post('/course/:id', async (req, res, next) => {
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

router.get('tutor/status/:status', async (req, res, next) => {
  const snapshot = await firestore.firestore.collection('appointment').where('tutorId', '==', req.user.userId).where('status', '==', req.params.status).get()
  
  const appointments = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
  return appointments;
})

router.get('student/status/:status', async (req, res, next) => {
  const snapshot = await firestore.firestore.collection('appointment').where('studentId', '==', req.user.userId).where('status', '==', req.params.status).get()

  const appointments = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
  return appointments;
})

module.exports = router