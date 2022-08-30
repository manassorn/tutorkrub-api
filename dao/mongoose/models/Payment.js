const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', localField: 'courseId' },
  amount: Number,
  scheduleDate: String,
  scheduleHour: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User', localField: 'studentId' },
  status: { type: String, enum:['pending','paid'], default: 'pending'},
  promptpayQRCodeUrl: { type: String },
  appointment: { type: Schema.Types.ObjectId, ref: 'Appointment' },
}, {
  toJSON: {virtuals: true}
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment