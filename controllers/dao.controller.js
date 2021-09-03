class DaoController {
  constructor(dao) {
    this.dao = dao
  }
  async create(data) {
    return await this.dao.create(data)
  }
  async get(id) {
    return await this.dao.get(id)
  }
  async findByIdAndUpdate(id, update) {
    return await this.dao.findByIdAndUpdate(id, update)
  }
}

module.exports = DaoController