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
  req.setTimeout(5000); //set a 5s timeout for this request
  const payment = await paymentDao.get(req.body.paymentId)
  const amount = payment.amount
  if (payment.promptpayQRCodeUrl) {
    api.ok(res, { promptpayQRCodeUrl: payment.promptpayQRCodeUrl })
  } else {
    const charge = await createPromptpayCharge(amount)
    const promptpayQRCodeUrl = charge.source.scannable_code.image.download_uri
    payment.promptpayQRCodeUrl = promptpayQRCodeUrl
    await payment.save()
    api.ok(res, { promptpayQRCodeUrl })
  }
}));

async function createPromptpayCharge(amount) {
  const source = await omise.sources.create({
    amount: amount * 100,
    currency: 'THB',
    type: 'promptpay'
  })
  const charge = await omise.charges.create({
    'description': 'Charge for order ID: 999',
    'amount': amount * 100,
    'currency': 'THB',
    'source': source.id,
  });
  return charge
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