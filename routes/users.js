var express = require('express');
var router = express.Router();

var api = require('./api')
var usersController = require('../controllers/users.controller')

var s3 = require('../services/s3.service')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.put('/me/password', async (req, res, next) => {
  const user = await usersController.get(req.user.id)
  if (user.comparePassword(req.body.currentPassword)) {
    user.password = req.body.newPassword
    await user.save()
    api.responseOk(res)

  } else {
    api.responseError400(res, 'current password is incorrect')
  }
});

router.put('/me', async (req, res, next) => {
  await usersController.findByIdAndUpdate(req.user.id, req.body)
  
  api.responseOk(res)
});

router.get('/me', async (req, res, next) => {
  if(req.user.userId) {
    const user = await usersController.get(req.user.id)

    api.responseOk(res, user)
  } else {
    api.responseErrorCode(res, 403, 'no auth')
  }
});

router.post('/me/availability', async (req, res, next) => {
 
   const availability = req.body.availability
   // await crudController.update('Users', req.user.id, { availability })
   api.responseOk(res)
});

router.get('/me/availability', async (req, res, next) => {

  // const user = await crudController.readById('Users', req.user.id)
  api.responseOk(res, user.availability)
});

router.post('/me/avatar', upload.single('file'), function(req, res, next) {
  s3.upload(req.file.buffer).then((avatarUrl) => {
    
    usersController.updateAvatarUrl(req.user.id, avatarUrl)
  })
  api.responseOk(res)
})

module.exports = router;
