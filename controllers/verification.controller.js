var crudController = require('./crud.controller')
var sendgrid = require('../services/sendgrid.service')
var firestore = require('../services/firestore.service')


module.exports.createForEmail = async (email) => {
  const random = Math.floor(100000 + Math.random() * 900000)
  const payload = {email,code:random}
  crudController.create('verification', payload)
  await sendgrid.send(email, 'test', 'test: ' + random)
}

module.exports.verifyForEmail = async (email, code) => {
  const snapshot = await firestore.collection('verification').where('email', '==', email).where('code', '==', code).get()
  return snapshot.docs.map(doc => doc.data()).length != 0;
}