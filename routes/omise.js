var express = require('express');
var router = express.Router();

var api = require('./api')
var omise = require('omise')({ 
  'secretKey': process.env.OMISE_SKEY || 'skey_test_5kscphkh4415xg2hrcf',
  'omiseVersion': '2017-11-02' 
});

router.post('/charges/promptpay/qrcode', async (req, res, next) => {
  try {
    console.log(req.body.sourceId)
  const resp = await omise.charges.create({ 
    'description': 'Charge for order ID: 888', 
    'amount': req.body.amount, 
    'currency': 'thb', 
    'source': req.body.sourceId
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