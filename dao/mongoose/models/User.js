const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  krubId: String,
  name: {type: String/*, required: true*/},
  avatarUrl: String,
  skypeId: String,
  zoomId: String,
});

 
const User = mongoose.model('User', userSchema);

module.exports = User;