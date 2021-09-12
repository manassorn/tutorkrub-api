const BaseDao = require('./base.dao')

const User = require('./mongoose/models/User')

class UsersDao extends BaseDao {
  constructor() {
    super(User)
  }
}

const usersDao = new UsersDao()
module.exports = usersDao