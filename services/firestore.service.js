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

module.exports.update = (collection, id, payload) => {
    return firestore.collection(collection).doc(id).update(payload)
}