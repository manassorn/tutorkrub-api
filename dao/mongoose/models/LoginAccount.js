const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginAccountSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  email: {type: String, required: true},
  password:   String,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const LoginAccount = mongoose.model('LoginAccount', loginAccountSchema);

module.exports = LoginAccount