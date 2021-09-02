const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', localField: 'courseId' },
  startTime: Date,
  period: Number,
  student: { type: Schema.Types.ObjectId, ref: 'User', localField: 'studentId' },
  tutor: { type: Schema.Types.ObjectId, ref: 'User', localField: 'tutorId' },
  status: String,
  messages: [{ from: Schema.Types.ObjectId, timestamp:Date, text: String }],
  histories: [{ type: String }]
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment