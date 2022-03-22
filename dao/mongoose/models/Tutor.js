const mongoose = require('mongoose')
const { Schema } = mongoose;

const tutorSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  teachingSubjects: [{ type: String }],
  teachingLevels: [{ type: String }],
  price: Number,
  additionalDetails: [{ type: String }]
});

 
const Tutor = mongoose.model('Tutor', tutorSchema);

module.exports = Tutor;