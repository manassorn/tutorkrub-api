const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  subject: String,
  level: String,
  tutor: { type: Schema.Types.ObjectId, ref: 'User', localField: 'tutorId' }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course