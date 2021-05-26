// import admin from 'firebase-admin'
// import path from 'path';
var path = require('path')
var admin = require('firebase-admin');

// tslint:disable-next-line
const serviceAccount = require(path.join(__dirname, '../conf/hiscore.json'));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports.firestore =  firestore;

const toList = (snapshot) => {
  return snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
}
module.exports.toList = toList

module.exports.create = (collection, payload) => {
    return firestore.collection(collection).add(payload)
}

module.exports.createSub = (collection, id,  subCollection, payload) => {
  return firestore.collection(collection).doc(id).collection(subCollection).add(payload)
}

module.exports.update = (collection, id, payload) => {
    return firestore.collection(collection).doc(id).update(payload)
}

module.exports.read = async (collection) => {
  const snapshot = await firestore.collection(collection).get()
  return snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return {id, ...data}
  });
};

module.exports.readSub = async (collection, id, subCollection) => {
  const snapshot = await firestore.collection(collection).doc(id).collection(subCollection).get()
  return snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return {id, ...data}
  });
};

module.exports.readBy = async (collection, fieldName, fieldValue) => {
  const snapshot = await firestore.collection(collection).where(fieldName, '==', fieldValue).get()
  return toList(snapshot)
};

module.exports.readBy2 = async (collection, field1, value1, field2, value2) => {
  const snapshot = await firestore.collection(collection).where(field1, '==', value1).where(field2, '==', value2).get()
  return toList(snapshot)
};


module.exports.readById = async (collection, id) => {
  const doc = await firestore.collection(collection).doc(id).get()
  const data = doc.data()
  return { id, ...data }
};

module.exports.readByUniqueField = async (collection, fieldName, fieldValue) => {
  const snapshot = await firestore.collection(collection).where(fieldName, '==', fieldValue).get()
  const a = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
  return a[0]
};

