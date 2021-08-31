const User = require('./mongoose/models/User')


module.exports.create = async (data) => {
  const user = new User(data)
  return await user.save()
}