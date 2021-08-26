import mongoose from 'mongoose';
const { Schema } = mongoose;

const courseSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  description: String,
  price: Number,
  subject: String,
  schoolLevel: String,
  tutor: { type: Schema.Types.ObjectId, ref: 'User', localField: 'tutorId' }
});

const Course = mongoose.model('Course', courseSchema);

module.exports.Course = Course