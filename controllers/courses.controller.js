const DaoController = require('./dao.controller')
const coursesDao = require('../dao/course.dao')

class CoursesController extends DaoController {
  constructor() {
    super(coursesDao)
  }
  
  async getListByOwner(tutorId) {
    return await this.dao.getListByOwner(tutorId)
  }
  
  async getAll() {
    return await this.dao.getAll()

  }
  
}

module.exports = coursesController = new CoursesController()