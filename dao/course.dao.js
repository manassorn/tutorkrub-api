const Course = require('./mongoose/models/Course')

module.exports.getListByOwner = async (tutorId) => {
  const courses = await Course.find({'tutor': tutorId}).exec()
  return courses
}

module.exports.get = async (courseId) => {
  const course = await Course.findById(courseId).exec()
  return course
}

module.exports.create = async (data) => {
  const course = new Course(data)
  return await course.save()
}

