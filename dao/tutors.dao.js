const BaseDao = require('./base.dao')

const Tutor = require('./mongoose/models/Tutor')

class TutorsDao extends BaseDao {
  constructor() {
    super(Tutor)
  }

  async findByUserIdAndUpdate(userId, update) {
    return await this.Model.findOneAndUpdate({userId}, update)
  }
}

const tutorsDao = new TutorsDao()
module.exports = tutorsDao