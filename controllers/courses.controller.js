var firestoreService = require('../services/firestore.service')
var sendgrid = require('../services/sendgrid.service')
var crudController = require('./crud.controller')
var admin = require('firebase-admin');


module.exports.listByOwner = async (userId) => {
  var courses = await crudController.readBy('Courses', 'tutorId', userId)
  var tutorIds = courses.map(course => course.tutorId).filter(id => id !== undefined)
  
  var usersMap = {}
  if (tutorIds.length > 0) {
    var users = await crudController.whereIdIn('Users', tutorIds)
    users.map(user => {
      usersMap[user.id] = user
    })
  }

  courses = courses.map(course => {
    course.tutorAvatarUrl = (usersMap[course.tutorId]||{}).avatarUrl
    course.tutorName = (usersMap[course.tutorId]||{}).name
    return course
  })
  return courses
}

module.exports.get = async (id) => {
  var course = await crudController.readById('Courses', id)
  var tutor = await crudController.readById('Users', course.tutorId)
  course.tutorAvatarUrl = tutor.avatarUrl
  course.tutorName = tutor.name
  return course
}