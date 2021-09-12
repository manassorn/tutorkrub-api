class BaseDao {
  constructor(Model) {
    this.Model = Model
  }
  async findByIdAndUpdate(id, update) {
    this.Model.findByIdAndUpdate(id, update)
  }
  async create(data) {
    const model = new this.Model(data)
    return await model.save()
  }
}

module.exportd = BaseDao