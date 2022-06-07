const BaseDao = require('./base.dao')

const User = require('./mongoose/models/User')

class UsersDao extends BaseDao {
  constructor() {
    super(User)
  }
  
  async updateAvatarUrl(userId, avatarUrl) {
    const user = await this.get(userId)
    user.avatarUrl = avatarUrl
    user.save()
  }

  async getByKrubId(krubId) {
    const user = await this.findOne({krubId})
    return user
  }
}

const usersDao = new UsersDao()
module.exports = usersDao