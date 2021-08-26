import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  name: String,
  avatarUrl: Number,
  skypeId: String,
  zoomId: String,
});

const User = mongoose.model('User', userSchema);

module.exports.User = User