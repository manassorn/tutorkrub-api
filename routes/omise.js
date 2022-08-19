const express = require('express');
const router = express.Router();

const api = require('./api')
const paymentDao = require('../dao/payment.dao')

var omise = require('omise')({
  publicKey:    process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: '2017-11-02'
});

router.post('/promptpay/qrcode', async (req, res, next) => {
  const courseId = req.body.courseId
  const scheduleDate = req.body.scheduleDate
  const scheduleHour = req.body.scheduleHour
  const userId = req.user.id
  let payment = await createPaymentIfNotExists(userId, courseId, scheduleDate, scheduleHour)
  if (payment.promptpayQRCodeUrl) {
    return api.ok(res, {qrCodeUrl: payment.promptpayQRCodeUrl })
  } else {
    try {
      const charge = await createPromptpayCharge(req.body.price)
      const qrCodeUrl = charge.source.scannable_code.image.download_uri

      payment.promptpayQRCodeUrl = qrCodeUrl
      await payment.save()
      api.ok(res, {qrCodeUrl})
    } catch (err) {
      console.log(err)
    }
  }
});

async function createPaymentIfNotExists(userId, courseId, scheduleDate, scheduleHour) {
  const payment = await paymentDao.findPayment(userId, courseId, scheduleDate, scheduleHour)
  if (payment) {
    return payment
  }
  return await paymentDao.create({
    user: userId,
    course: courseId,
    scheduleDate,
    scheduleHour
  })
}

async function createPromptpayCharge(amount) {
  const source = await omise.sources.create({
    amount: amount+ '00',
    currency: 'THB',
    type: 'promptpay'
  })
  const resp = await omise.charges.create({
    'description': 'Charge for order ID: 999',
    'amount': amount + '00',
    'currency': 'THB',
    'source': source.id,
  });
  return resp
}

router.post('/webhook', async (req, res, next) => {
  try {
    console.log(req.body)
  api.ok(res)
  } catch (err) {
    console.log(err)
  }

});

router.get('/webhook', async (req, res, next) => {
  try {
  api.ok(res, 'ok')
  } catch (err) {
    console.log(err)
  }

});


module.exports = router