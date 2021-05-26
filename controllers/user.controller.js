var firestoreService = require('../services/firestore.service')
var admin = require('firebase-admin')

module.exports.getUserByEmailPassword = async (email, password) => {
  const snapshot = await firestoreService.firestore.collection('Users').where('email', '==', email).where('password', '==', password).get()

  const users = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return {id, ...data}
  });
  return users[0];
}

module.exports.getByIdList = async(idList) => {
  if(idList.length == 0) return []
  const snapshot = await firestoreService.firestore.collection('Users').where(admin.firestore.FieldPath.documentId(), 'in', idList).get()
  const users = firestoreService.toList(snapshot)
  return users
}