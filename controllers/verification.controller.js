var firestore = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')


module.exports.verifyEmail = (email) => {
  const random = Math.floor(Math.random() * 100000)
  const payload = {email,random}
  crudController.create('verification', payload)
  await sendgrid.send(email, 'test', 'test: ')
}

module.exports.update = (collection, id, payload) => {
  firestore.update(collection, id, payload)
}

module.exports.read = async (collection) => {
  const data = await firestore.read(collection)
  await sendgrid.send('manassorn@gmail.com', 'test', 'test')
  return data;
}