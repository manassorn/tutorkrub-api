var firestore = require('../services/firestore.service')

module.exports.login = async (email, password) => {
  const snapshot = await firestore.firestore.collection('user').where('email', '==', email).where('password', '==', password).get()
  console.log(snapshot.docs.length)
  return snapshot.docs.map(doc => doc.data()).length != 0;
}

