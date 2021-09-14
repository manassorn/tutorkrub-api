class BaseDao {
  constructor(Model) {
    this.Model = Model
  }
  async findByIdAndUpdate(id, update) {
    return await this.Model.findByIdAndUpdate(id, update)
  }
  async create(data) {
    const model = new this.Model(data)
    return await model.save()
  }
  async get(id) {
    console.log('bbb')
    return await this.Model.findById(id).exec()
  }
}

module.exports = BaseDao