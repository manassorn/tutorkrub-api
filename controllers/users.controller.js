const DaoController = require('./dao.controller')
const usersDao = require('../dao/users.dao')

class UsersController extends DaoController {
  constructor() {
    super(usersDao)
  }

  async getAvailability(tutorId) {
    return await this.dao.getAvailability(tutorId)
  }
}

module.exports = usersController = new UsersController()