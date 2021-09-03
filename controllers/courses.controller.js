const DaoController = require('./dao.controller')
const courseDao = require('../dao/course.dao')

class CoursesController extends DaoController {
  constructor() {
    super(courseDao)
  }
  
  async getListByOwner(tutorId) {
    return await this.dao.getListByOwner(tutorId)
  }
}

module.exports = coursesController = new CoursesController()