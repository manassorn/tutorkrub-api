const BaseDao = require('./base.dao')

const Favorite = require('./mongoose/models/Favorite')

class FavoriteDao extends BaseDao {
  constructor() {
    super(Favorite)
  }

  async add(userId, tutorId) {

    return await Favorite.findOneAndUpdate({ user: userId }, { $addToSet: { tutors: tutorId } });
  }

  async remove(tutorId) {
    return await Favorite.findOneAndUpdate({ user: userId }, { $pull: { tutors: tutorId } });

  }
}

const favoriteDao = new FavoriteDao()
module.exports = favoriteDao