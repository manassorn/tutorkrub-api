class DaoController {
  constructor(dao) {
    this.dao = dao
  }
  async create(data) {
    return await this.dao.create(dsta)
  }
}

module.exports = DaoController