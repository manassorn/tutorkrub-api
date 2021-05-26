var express = require('express');
var router = express.Router();

var api = require('./api')
var crudController = require('../controllers/crud.controller')

router.get('/', async (req, res) => {
  var courses = await crudController.read('Courses')
  api.ok(res, courses)
})



module.exports = router;