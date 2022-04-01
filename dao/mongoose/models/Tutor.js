const mongoose = require('mongoose')
const { Schema } = mongoose;

const tutorSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  teachingSubjects: [{ type: String }],
  teachingLevels: [{ type: String }],
  price: Number,
  additionalDetails: [{ type: String }],
  user: { type: Schema.Types.ObjectId, ref: 'User', localField: 'userId' },
});

 
const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;