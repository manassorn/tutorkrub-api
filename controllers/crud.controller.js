var firestoreService = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')
var admin = require('firebase-admin');



module.exports.create = (collection, payload) => {
    firestoreService.create(collection, payload)
}

module.exports.createSub = (collection, id, subCollection, payload) => {
  firestoreService.createSub(collection, id, subCollection, payload)
}

module.exports.update = (collection, id, payload) => {
    firestoreService.update(collection, id, payload)
}

module.exports.read = async (collection) => {
  const data = await firestoreService.read(collection)
  return data;
}

module.exports.readSub = async (collection, id, subCollection) => {
  const data = await firestoreService.readSub(collection, id, subCollection)
  return data;
}

module.exports.readById = async (collection, id) => {
  const data = await firestoreService.readById(collection, id)
  return data;
}

const whereIdIn = async (collection, ids) => {
  const snapshot = await firestoreService.firestore.collection(collection).where(admin.firestore.FieldPath.documentId(), 'in', ids).get()
  const list = firestoreService.toList(snapshot)
  return list
}
module.exports.whereIdIn = whereIdIn

module.exports.join = async (leftList, collection, fieldA, fieldB, fieldNeeded) => {
  const a = leftList.map(item => item[fieldA])
  const b = whereIdIn(collection, a)
}

module.exports.listToMap = (list, key = 'id') => {
  const m = {}
  list.map(item => {
    m[item[key]] = item
  })
  return m
}