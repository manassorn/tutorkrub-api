const BaseDao = require('./base.dao')

const Favorite = require('./mongoose/models/Favorite')

class FavoriteDao extends BaseDao {
  constructor() {
    super(Favorite)
  }

  async add(userId, tutorId) {
    return await Favorite.findByIdAndUpdate(userId, { $addToSet: { tutors: tutorId } }, {upsert: true});
  }
  async remove(userId, tutorId) {
    return await Favorite.findByIdAndUpdate(userId, { $pull: { tutors: tutorId } });

  }
}

const favoriteDao = new FavoriteDao()
module.exports = favoriteDao