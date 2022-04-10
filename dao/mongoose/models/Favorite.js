const mongoose = require('mongoose')
const { Schema } = mongoose;

const favoriteSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  user: {type: Schema.Types.ObjectId, required: true},
  tutors: [Schema.Types.ObjectId],
});


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;