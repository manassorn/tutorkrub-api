const BaseDao = require('./base.dao')
const Course = require('./mongoose/models/Course')

class CourseDao extends BaseDao {
  constructor() {
    super(Course)
  }
  
  async getListByOwner(userId) {
    const courses = await Course.find({'user': userId}).exec()
    return courses
  }

  async findByTutorId(tutorId) {
    const courses = await Course.find({'tutor': tutorId}).exec()
    return courses
  }
  
  async getAll() {
    const courses = await Course.find().populate('tutor').exec()
    return courses
  }
  
  async get(courseId) {
    return await Course.findById(courseId).exec()
  }
}

module.exports = coursesDao = new CourseDao()