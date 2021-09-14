const BaseDao = require('./base.dao')
const Course = require('./mongoose/models/Course')

class CoursesDao extends BaseDao {
  constructor() {
    super(Course)
  }
  
  async getListByOwner(tutorId) {
    const courses = await Course.find({'tutor': tutorId}).populate('tutor').exec()
    return courses
  }
  
  async getAll() {
    const courses = await Course.find().populate('tutor').exec()
    return courses
  }
}

module.exports = coursesDao = new CoursesDao()