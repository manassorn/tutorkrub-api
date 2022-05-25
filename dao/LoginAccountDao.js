const LoginAccount = require('./mongoose/models/LoginAccount')

module.exports.getByEmail = async (email) => {
  const loginAccount = await LoginAccount.findOne({'email': email}).populate('user').exec()
  return loginAccount
}

module.exports.create = async (data) => {
  const loginAccount = new LoginAccount(data)
  await loginAccount.save()
};