var firestore = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')


module.exports.create = (collection, payload) => {
    firestore.create(collection, payload)
}

module.exports.update = (collection, id, payload) => {
    firestore.update(collection, id, payload)
}

module.exports.read = async (collection) => {
  const data = await firestore.read(collection)
  return data;
}

module.exports.readById = async (collection, id) => {
  const data = await firestore.readById(collection, id)
  return data;
}