var express = require('express');
var router = express.Router();

var api = require('./api')
var omise = require('omise')({ 
  'secretKey': process.env.OMISE_SKEY, 
  'omiseVersion': '2015-09-10' 
});

router.post('/charge', async (req, res, next) => {
  const resp = await omise.charges.create({ 
    'description': 'Charge for order ID: 888', 
    'amount': req.body.amount, 
    'currency': 'thb', 
    'source': req.body.sourceId
  });
  const qrUri = resp.source.scannable_code.image.download_uri

  api.ok(res, {qrUri})

});


module.exports = router