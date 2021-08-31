var loginAccountDao = require('../dao/LoginAccountDao')
var userDao = require('../dao/UserDao')


module.exports.login = async (email, pwd) => {
  const loginAccount = loginAccountDao.getByEmail(email)
  const match = await loginAccount.comparePassword(pwd)
  if(!match) return
  else return loginAccount.user
}
