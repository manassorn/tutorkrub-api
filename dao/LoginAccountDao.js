const LoginAccount = require('./mongoose/models/LoginAccount')

module.exports.getByEmail = async (email, pwd) => {
  const loginAccount = await LoginAccount.findOne({'email': email}).exec()
  return loginAccount
}

module.exports.create = async (data) => {
  const loginAccount = new LoginAccount(data)
  await loginAccount.save()
};