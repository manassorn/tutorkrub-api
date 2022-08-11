const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true},
  price: { type: Number, required: true},
  tutor: { type: Schema.Types.ObjectId, ref: 'tutor', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  toJSON: {virtuals: true}
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course