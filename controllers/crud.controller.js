var firestore = require('../services/firestore.service')

module.exports.create = (collection, payload) => {
    firestore.create(collection, payload)
}

module.exports.update = (collection, id, payload) => {
    firestore.update(collection, id, payload)
}