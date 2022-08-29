const BaseDao = require('./base.dao')
const LoginAccount = require('./mongoose/models/LoginAccount')

class LoginAccountDao extends BaseDao {
  constructor() {
    super(LoginAccount)
  }

  async getByEmail(email) {
    const loginAccount = await LoginAccount.findOne({'email': email}).populate('user').exec()
    return loginAccount
  }
  async getByUser(userId) {
    const loginAccount = await LoginAccount.findOne({'user': userId}).exec()
    return loginAccount
  }
}

const loginAccountDao = new LoginAccountDao()
module.exports = loginAccountDao

// module.exports.create = async (data) => {
//   const loginAccount = new LoginAccount(data)
//   await loginAccount.save()
// };