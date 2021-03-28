var firestoreService = require('../services/firestore.service')

module.exports.getUserByEmailPassword = async (email, password) => {
  const snapshot = await firestoreService.firestore.collection('user').where('email', '==', email).where('password', '==', password).get()

  const users = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return {id, ...data}
  });
  return users[0];
}

module.exports.getByIdList = async(idList) => {
  const snapshot = await firestoreService.firestore.collection('user').where(admin.firestore.FieldPath.documentId(), 'in', idList).get()
  const users = firestoreService.toList(snapshot)
  return users
}