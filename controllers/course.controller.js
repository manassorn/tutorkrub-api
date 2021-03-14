var firestoreService = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')
var crudController = require('./crud.controller')
var admin = require('firebase-admin');


module.exports.list = async () => {
  var courses = await crudController.read('course')
  var tutorIds = courses.map(course => course.tutorId).filter(id => id !== undefined)
  var snapshot = await firestoreService.firestore.collection('user').where(admin.firestore.FieldPath.documentId(), 'in', tutorIds).get()
  var users = firestoreService.toList(snapshot)
  var usersMap = {}
  users.map(user => {
    usersMap[user.id] = user
  })
  console.log(usersMap)
  courses = courses.map(course => {
    console.log(course.tutorId)
    console.log(usersMap[course.tutorId])
    course.tutorAvatarUrl = usersMap[course.tutorId]||{}.avatarUrl
    course.tutorName = usersMap[course.tutorId]||{}.name
    return course
  })
  return courses
}

module.exports.get = async (id) => {
  var course = await crudController.readById('course', id)
  var tutor = await crudController.readById('user', course.tutorId)
  course.tutorAvatarUrl = tutor.avatarUrl
  course.tutorName = tutor.name
  return course
}