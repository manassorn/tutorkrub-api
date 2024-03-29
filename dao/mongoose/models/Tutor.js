const mongoose = require('mongoose')
const { Schema } = mongoose;

const tutorSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  name: String,
  teachSubjects: [{ type: String, required: true }],
  teachLevels: [{ type: String, required: true }],
  fbPostURL: String,
  additionalDetails: [{ type: String }],
  availability: {type: Schema.Types.Mixed},
  user: { type: Schema.Types.ObjectId, ref: 'User', localField: 'userId' },
});

 
const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;