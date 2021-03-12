var firestoreService = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')
var crudController = require('./crud.controller')


module.exports.list = async (collection, payload) => {
  var courses = await crudController.read('course')
  var tutorIds = courses.map(course => course.tutorId).filter(id => id !== undefined)
  var snapshot = await firestoreService.firestore.collection('user').where('_id', 'in', tutorIds).get()
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
