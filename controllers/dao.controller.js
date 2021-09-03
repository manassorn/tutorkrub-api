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
}

module.exports = DaoController