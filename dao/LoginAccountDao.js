const LoginAccount = require('./mongoose/models/LoginAccount')

module.exports.getByEmail = async (email, pwd) => {
  const loginAccount = await LoginAccount.findOne({'email': email}).populate('user')
  return loginAccount
}

module.exports.create = async (data) => {
  const loginAccount = new LoginAccount(data)
  await loginAccount.save()
};