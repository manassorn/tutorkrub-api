const DaoController = require('./dao.controller')
const usersDao = require('../dao/user.dao')

class UsersController extends DaoController {
  constructor() {
    super(usersDao)
  }

  async getAvailability(tutorId) {
    return await this.dao.getAvailability(tutorId)
  }
  
  async updateAvatarUrl(userId, avatarUrl) {
    return await this.dao.updateAvatarUrl(userId, avatarUrl)
  }
}

module.exports = usersController = new UsersController()