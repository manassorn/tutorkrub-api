class DaoController {
  constructor(dao) {
    this.dao = dao
  }
  async create(data) {
    return await this.dao.create(data)
  }
}

module.exports = DaoController