const BaseDao = require('./base.dao')
const OmiseEvent = require('./mongoose/models/OmiseEvent')

class OmiseEventDao extends BaseDao {
  constructor() {
    super(OmiseEvent)
  }

}

const omiseEventDao = new OmiseEventDao()
module.exports = omiseEventDao
