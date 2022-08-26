const express = require('express');
const router = express.Router();

const api = require('./api')
const asyncHandler = require('../async-handler')
const paymentDao = require('../dao/payment.dao')

var omise = require('omise')({
  publicKey:    process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: '2017-11-02'
});

router.post('/promptpay/qrcode', asyncHandler(async (req, res, next) => {
  req.clearTimeout(); // clear request timeout
  req.setTimeout(5000); //set a 3s timeout for this request
  const courseId = req.body.courseId
  const scheduleDate = req.body.scheduleDate
  const scheduleHour = req.body.scheduleHour
  const userId = req.user.id
  let payment = await createPaymentIfNotExists(userId, courseId, scheduleDate, scheduleHour)
  if (payment.promptpayQRCodeUrl) {
    api.ok(res, {qrCodeUrl: payment.promptpayQRCodeUrl })
  } else {
    const charge = await createPromptpayCharge(req.body.amount)
    const qrCodeUrl = charge.source.scannable_code.image.download_uri

    payment.promptpayQRCodeUrl = qrCodeUrl
    await payment.save()
    api.ok(res, {qrCodeUrl})
  }
}));

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
    amount: amount * 100,
    currency: 'THB',
    type: 'promptpay'
  })
  console.log('aa',source.id)
  const resp = await omise.charges.create({
    'description': 'Charge for order ID: 999',
    'amount': amount * 100,
    'currency': 'THB',
    'source': source.id,
  });
  console.log('aa1')
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