const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: String,
  price: Number,
  tutor: { type: Schema.Types.ObjectId, ref: 'User', localField: 'tutorId' }
}, {
  toJSON: {virtuals: true}
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course