const express = require('express');
const router = express.Router();

const api = require('./api')
const paymentDao = require('../dao/payment.dao')

var omise = require('omise')({
  publicKey:    process.env.OMISE_PUBLIC_KEY || 'pkey_test_5kscphkh3r2cqs8plug',
  secretKey: process.env.OMISE_SECRET_KEY || 'skey_test_5kscphkh4415xg2hrcf',
  omiseVersion: '2017-11-02'
});

router.post('/promptpay/qrcode', async (req, res, next) => {

  const courseId = req.body.courseId
  const scheduleDate = req.body.scheduleDate
  const scheduleHour = req.body.scheduleHour
  const userId = req.user.id
  let payment = await paymentDao.findPayment(userId, courseId, scheduleDate, scheduleHour)
  if (payment && payment.promptpayQRCodeUrl) {
    return api.ok(res, {qrCodeUrl: payment.promptpayQRCodeUrl})
  }
  payment = await paymentDao.create({
    user: userId,
    course: courseId,
    scheduleDate,
    scheduleHour
  })
  console.log('payment._id=', payment._id)
  try {
    const source = await omise.sources.create({
      amount: req.body.price + '00',
      currency: 'THB',
      type: 'promptpay'
    })
    const resp = await omise.charges.create({
      'description': 'Charge for order ID: 999',
      'amount': req.body.price + '00',
      'currency': 'THB',
      'source': source.id,
    });
    const qrCodeUrl = resp.source.scannable_code.image.download_uri

    api.ok(res, {qrCodeUrl})
  } catch (err) {
    console.log(err)
  }

});

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