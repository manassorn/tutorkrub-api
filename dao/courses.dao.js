const BaseDao = require('./base.dao')
const Course = require('./mongoose/models/Course')

class CoursesDao extends BaseDao {
  constructor() {
    super(Course)
  }
  
  async getListByOwner(tutorId) {
    const courses = await Course.find({'tutor': tutorId}).exec()
    return courses
  }
}

module.exports = coursesDao = new CoursesDao()