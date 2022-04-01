const BaseDao = require('./base.dao')

const Tutor = require('./mongoose/models/Tutor')

class TutorsDao extends BaseDao {
  constructor() {
    super(Tutor)
  }

  async findByUserIdAndUpdate(userId, update) {
    return await this.Model.findOneAndUpdate({userId}, update)
  }

  async search(subject, level) {
    return await this.Model.find({ teachingSubjects: subject, teachingLevels: level})
      .populate('user').exec()
  }
}

const tutorsDao = new TutorsDao()
module.exports = tutorsDao