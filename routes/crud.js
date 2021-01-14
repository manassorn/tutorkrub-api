var express = require('express');
var router = express.Router();

var crudController = require('../controllers/crud.controller')
var api = require('./api')
var s3 = require('../services/s3.service')

/* GET users listing. */
router.get('/:collection', async function(req, res, next) {
  try {
    const data = await crudController.read(req.params.collection)
    api.responseOk(res, data)
  } catch (e) {
    next(e)
  }
});
router.get('/:collection/:id', async function(req, res, next) {
  try {
    const data = await crudController.readById(req.params.collection, req.params.id)
    api.responseOk(res, data)
  } catch (e) {
    next(e)
  }
});
router.post('/:collection', function(req, res, next) {
  crudController.create(req.params.collection, req.body)
  api.responseOk(res)
});
router.post('/:collection/:id', function(req, res, next) {
  crudController.update(req.params.collection, req.params.id, req.body)
  api.responseOk(res)
});
//req.params.fileName (Optional)
//req.params.fieldName
router.post('/:collection/:id/upload', function(req, res, next) {
  crudController.update(req.params.collection, req.params.id, req.body)
  if(req.file && req.file.length > 0) {
    handleFile(req).then((file) => {
      var fileName = req.params.fileName || new Date().getTime()
      if (file.mimetype === 'image/jpeg') {
        fileName += '.jpg'
      } else if(file.mimetype === 'image/png') {
        fileName += '.png'
      } else {
        // todo - res error
      }
      return s3.upload(fileName, file.binary)
    }).then((sendData) => {
      var payload = {}
      payload[req.params.fieldName] = sendData.Location
      crudController.update(req.params.collection, req.params.id, req.body)
    })
  }
  api.responseOk(res)
});

function handleFile(req) {

  return new Promise<{mimetype: string, binary: any}>((resolve, reject) => {
    const busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      const buffers = new Array()
      file.on('data', (binary) => {
        console.log('File [' + fieldname + '] got ' + binary.length + ' bytes');
        buffers.push(binary)
      });
      file.on('end', () => {
        console.log('File [' + fieldname + '] Finished');
        Buffer.concat(buffers)
        resolve({mimetype, binary: Buffer.concat(buffers)})
      });
    });
    // busboy.on('finish', () => {
    // });
    req.pipe(busboy);
  })
}

module.exports = router;
