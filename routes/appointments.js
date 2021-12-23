var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')
var appointmentsController = require('../controllers/appointments.controller')

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

router.post('/', async (req, res, next) => {

  const studentId = req.user.id 
  const appointment = req.body
  appointment.student = studentId
  appointment.status = 'tobepaid'
  
  const course = await coursesController.get(req.body.courseId)
appointment.tutor = course.tutor  
  
  const appointment2 = await appointmentsController.create(appointment)
  
  api.responseOk(res, appointment2)
  
});

router.get('/', async (req, res, next) => {
  var userId = req.user.id

console.log('fffff')
  const appointments = await appointmentsController.findByAttendee(userId)
  console log('hhhh')
  return appointments
})




module.exports = router