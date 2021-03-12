var firestoreService = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')
var crudController = require('./crud.controller')
var admin = require('firebase-admin');


module.exports.list = async () => {
  var courses = await crudController.read('course')
  var tutorIds = courses.map(course => course.tutorId).filter(id => id !== undefined)
  var snapshot = await firestoreService.firestore.collection('user').where(admin.firestore.FieldPath.documentId(), 'in', tutorIds).get()
  var users = firestoreService.toList(snapshot)
  var userAvatars = {}
  users.map(user => {
    userAvatars[user.id] = user.avatarUrl
  })
  courses = courses.map(course => {
    course.tutorAvatarUrl = userAvatars[course.tutorId]
    return course
  })
  return courses
}

module.exports.get = async (id) => {
  var course = await crudController.readById('course', id)
  var tutor = await crudController.readById('user', course.tutorId)
  course.tutorAvatarUrl = tutor.avatarUrl
  return course
}