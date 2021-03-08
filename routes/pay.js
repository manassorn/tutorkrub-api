var express = require('express');
var router = express.Router();

var api = require('./api')
var payController = require('../controllers/pay.controller')

router.get('/test/:amount', async (req,res) => {
  try {
    const resp = await payController.testPay(500)
    api.responseOk(res,(resp))
  } catch (e) {
    console.log(JSON.toString(e))
    api.responseOk(res, e)
  }
})

/*
router.post('/appointment/:id', async (req, res, next) => {
  const userId = req.user.userId
  const appointmentId = req.params.id
  const payload = {
    courseId, startTime, length, 
    status: 'to_be_paid', //to_be_accepted, to_be_started, complete
    teacherId: userId,
    studentId: userId
  }
  const appointment = await crudController.create('appointment', payload)
  
  api.responseOk(res, appointment)
  
})*/

module.exports = router;