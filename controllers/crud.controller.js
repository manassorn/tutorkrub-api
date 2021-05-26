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

module.exports.readBy = async (collection, field, value) => {
  const data = await firestoreService.readBy(collection, field, value)
  return data;
}

module.exports.readBy2 = async (collection, field1, value1, field2, value2) => {
  const data = await firestoreService.readBy2(collection, field1, value1, field2, value2)
  return data;
}

module.exports.readById = async (collection, id) => {
  const data = await firestoreService.readById(collection, id)
  return data;
}

module.exports.readByUniqueField = async (collection, fieldName, fieldValue) => {
  const data = await firestoreService.readByUniqueField(collection, fieldName, fieldValue)
  return data;
}

const whereIdIn = async (collection, ids) => {
  if (ids.length == 0) return []
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

module.exports.join = (col1, col2, id1, id2, mapping) => {
  
  const col2Map = {}
  col2.map(item => {
    col2Map[item[id2]] = item
  })
  
  var newCol = col1.map(item => {
    for(k in mapping) {
      var col1Field = k
      var col2Field = mapping[k]
      item[col1Field] = (col2Map[col1[id1]] || {})[col2Field]
    }
    return item
  })
  
  return newCol
}