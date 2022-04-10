var express = require('express');
var router = express.Router();

var api = require('./api')
const favoriteDao = require('../dao/favorite.dao')


router.put('/tutor/:tutorId', async (req, res, next) => {
  await favoriteDao.add(req.user.id, req.params.tutorId)
  api.ok(res)
});

router.delete('/tutor/:tutorId', async (req, res, next) => {
  await favoriteDao.remove(req.user.id, req.params.tutorId)
  api.ok(res)
});

module.exports = router;