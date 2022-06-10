var express = require('express');
var router = express.Router();

var api = require('./api')
var s3 = require('../services/s3.service')

const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post('/then/create/:collection', upload.single('file'), function(req, res, next) {
  upload2(req.file.buffer).then((url) => {
    const payload = JSON.parse(req.body.payload || "{}");
    payload['fileUploadedUrl'] = url
    console.log(payload)
    // crudController.create(req.params.collection, payload)
  })
  api.responseOk(res)
});

router.post('/then/update/:collection/:id', upload.single('file'), function(req, res, next) {
  upload2(req.file.buffer).then((url) => {
    const payload = req.body.payload || {};
    payload['fileUploadedUrl'] = url
    // crudController.update(req.params.collection, req.params.id, payload)
  })
  api.responseOk(res)
});

router.post('/to/:collection/:id/:field', upload.single('file'), function(req, res, next) {
  upload2(req.file.buffer).then((url) => {
    const payload = req.body.payload || {};
    payload[req.params.field] = url
    // crudController.update(req.params.collection, req.params.id, payload)
  })
  api.responseOk(res)
});

function upload2(buffer) {
  return s3.upload(new Date().getTime() + ".png", buffer).then((sendData) => {
    return sendData.Location
  })
}

module.exports = router;
