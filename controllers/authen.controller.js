var firestoreService = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')
var crudController = require('./crud.controller')
var admin = require('firebase-admin');


module.exports.login = async (email, pwd) => {
  var snapshot = await firestoreService.firestore.collection('LoginAccounts').where('email', '==', email).where('pwd', '==', pwd).get()
  
  var accounts = firestoreService.toList(snapshot)
  if (account.length == 0) return undefined
  var userId = accounts[0].userId
  var user = await crudController.readById(userId)
  return user
}
