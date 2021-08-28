const LoginAccount = require('./mongoose/models/LoginAccount')

module.exports.getUserByEmailPassword = async (email, pwd) => {
  const loginAccount = await LoginAccount.findOne({'email': email, password: pwd}).exec()
  return loginAccount
}

module.exports.create = async (data) => {
  const loginAccount = new LoginAccount(data)
  await loginAccount.save()
};