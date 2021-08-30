const User = require('./mongoose/models/User')

module.exports.getUserByEmailPassword = async (email, pwd) => {
  const loginAccount = await LoginAccount.findOne({ 'email': email, password: pwd }).exec()
  return loginAccount
}

module.exports.create = async (data) => {
  const user = new User(data)
  await user.save()
}