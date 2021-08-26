import mongoose from 'mongoose';
const { Schema } = mongoose;

const loginAccountSchema = new Schema({
  _id: Schema.Types.ObjectId,
  email: String,
  password:   String,
  user: { type: Schema.Types.ObjectId, ref: 'User', localField: 'userId' }
});

const LoginAccount = mongoose.model('LoginAccount', loginAccountSchema);

module.exports.LoginAccount = LoginAccount