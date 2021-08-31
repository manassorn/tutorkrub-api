var loginAccountDao = require('../dao/LoginAccountDao')


module.exports.login = async (email, pwd) => {
  const loginAccount = loginAccountDao.getByEmail(email)
  console.log(loginAccount)
  const match = await loginAccount.comparePassword(pwd)
  if(!match) return
  else return loginAccount.user
}
