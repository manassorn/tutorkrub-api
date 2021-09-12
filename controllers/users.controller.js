const DaoController = require('./dao.controller')
const usersDao = require('../dao/users.dao')

class CoursesController extends DaoController {
  constructor() {
    super(usersDao)
  }

  async getAvailability(tutorId) {
    return await this.dao.getAvailability(tutorId)
  }
}

module.exports = coursesController = new CoursesController()