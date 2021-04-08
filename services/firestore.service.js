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

module.exports.readById = async (collection, id) => {
  const doc = await firestore.collection(collection).doc(id).get()
  const data = doc.data()
  return { id, ...data }
};

module.exports.toList = (snapshot) => {
  return snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  });
}