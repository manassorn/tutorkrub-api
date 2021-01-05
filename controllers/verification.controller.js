var crudController = require('./crud.controller')
var sendgrid = require('../services/sendgrid.service')


module.exports.verifyEmail = async (email) => {
  const random = Math.floor(Math.random() * 100000)
  const payload = {email,random}
  crudController.create('verification', payload)
  await sendgrid.send(email, 'test', 'test: ' + random)
}

module.exports.update = (collection, id, payload) => {
  firestore.update(collection, id, payload)
}

module.exports.read = async (collection) => {
  const data = await firestore.read(collection)
  return data;
}