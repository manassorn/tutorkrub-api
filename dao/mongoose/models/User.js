const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  username: String,
  name: {type: String, required: true},
  avatarUrl: Number,
  skypeId: String,
  zoomId: String,
});

 
const User = mongoose.model('User', userSchema);

module.exports = User;