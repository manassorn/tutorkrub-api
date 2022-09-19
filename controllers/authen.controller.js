var loginAccountDao = require('../dao/loginAccount.dao')


module.exports.login = async (email, pwd) => {
  const loginAccount = await loginAccountDao.getByEmail(email)
  if(loginAccount == undefined) return

  const match = await loginAccount.comparePassword(pwd)
  if(!match) return
  else return loginAccount.user
}
