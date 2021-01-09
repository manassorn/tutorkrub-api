var crudController = require('./crud.controller')
var sendgrid = require('../services/sendgrid.service')
var firestore = require('../services/firestore.service')

module.exports.checkExistingEmail = async (email) => {
  const snapshot = await firestore.firestore.collection('user').where('email', '==', email).get()
  console.log(snapshot.docs.length)
  return snapshot.docs.map(doc => doc.data()).length != 0;
}

module.exports.createForEmail = async (email) => {
  const random = Math.floor(100000 + Math.random() * 900000)
  const payload = {email,code:random}
  crudController.create('verification', payload)
  await sendgrid.send(email, 'test', 'test: ' + random)
}

module.exports.verifyForEmail = async (email, code) => {
    code = parseInt(code)
  console.log(email,code)
  const snapshot = await firestore.firestore.collection('verification').where('email', '==', email).where('code', '==', code).get()
  console.log(snapshot.docs.length)
  return snapshot.docs.map(doc => doc.data()).length != 0;
}