const mongoose = require('mongoose')
const { Schema } = mongoose;

const tutorSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  teachSubjects: [{ type: String, required: true }],
  teachLevels: [{ type: String, required: true }],
  additionalDetails: [{ type: String }],
  availability: {type: Schema.Types.Mixed},
  courses: [{type: Schema.Types.ObjectId, ref: 'Course'}],
  user: { type: Schema.Types.ObjectId, ref: 'User', localField: 'userId' },
});

 
const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;