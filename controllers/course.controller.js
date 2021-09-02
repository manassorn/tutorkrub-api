const DaoController = require('./dao.controller')
const courseDao = require('../dao/course.dao')

class CourseController extends DaoController {
  constructor() {
    super(courseDao)
  }
}

module.exports = courseController = new CourseController()