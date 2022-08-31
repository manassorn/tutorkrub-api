const express = require('express');
const router = express.Router();

const api = require('./api')
const asyncHandler = require('../async-handler')
const paymentDao = require('../dao/payment.dao')
const omiseEventDao = require('../dao/omiseEvent.dao')
const paymentControler = require('../controllers/payment.controller')

var omise = require('omise')({
  publicKey:    process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: '2017-11-02'
});

router.post('/promptpay/qrcode', asyncHandler(async (req, res, next) => {
  req.clearTimeout(); // clear request timeout
  req.setTimeout(5000); //set a 5s timeout for this request
  const paymentId = req.body.paymentId
  const payment = await paymentDao.get(paymentId)
  const amount = payment.amount
  if (payment.promptpayQRCodeUrl) {
    api.ok(res, { promptpayQRCodeUrl: payment.promptpayQRCodeUrl })
  } else {
    const charge = await createPromptpayCharge(paymentId, amount)
    const promptpayQRCodeUrl = charge.source.scannable_code.image.download_uri
    payment.promptpayQRCodeUrl = promptpayQRCodeUrl
    await payment.save()
    api.ok(res, { promptpayQRCodeUrl })
  }
}));

async function createPromptpayCharge(paymentId, amount) {
  const source = await omise.sources.create({
    amount: amount * 100,
    currency: 'THB',
    type: 'promptpay'
  })
  const charge = await omise.charges.create({
    'description': 'Payment ID: ' + paymentId, //todo - change to sth more meaningful
    'amount': amount * 100,
    'currency': 'THB',
    'source': source.id,
    'metadata': {
      'paymentId': paymentId
    }
  });
  return charge
}

router.post('/webhook', asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const event = req.body
  const paymentId = event.data.metadata.paymentId
  await omiseEventDao.create({payment: paymentId, event})
  await paymentControler.updateToPaid(paymentId)
  api.ok(res)
}));



module.exports = router