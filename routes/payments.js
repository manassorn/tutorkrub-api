var express = require('express');
var router = express.Router();

var api = require('./api')
var asyncHandler = require('../async-handler')
var paymentDao = require('../dao/payment.dao')

router.put('/', asyncHandler(async (req,res) => {
  const userId = req.user.id
  const courseId = req.body.courseId
  const amount = req.body.amount
  const scheduleDate = req.body.scheduleDate
  const scheduleHour = req.body.scheduleHour

  const payment = await paymentDao.createIfNotExists(userId, courseId, amount, scheduleDate, scheduleHour)
  api.responseOk(res, payment)
}))


module.exports = router;