const BaseDao = require('./base.dao')

const Tutor = require('./mongoose/models/Tutor')

class TutorDao extends BaseDao {
  constructor() {
    super(Tutor)
  }

  async findByUserIdAndUpdate(userId, update) {
    return await this.Model.findOneAndUpdate({userId}, update)
  }

  async search(subject, level) {
    if(!subject && !level) {
      return await this.Model.find()
        .populate('user').exec()

    }
    return await this.Model.find({ teachSubjects: subject, teachLevels: level})
      .populate('user').exec()
  }

  async getByUserId(userId) {
    return await this.Model.findOne({userId})
  }
}

const tutorsDao = new TutorDao()
module.exports = tutorsDao