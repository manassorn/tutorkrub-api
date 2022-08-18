const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', localField: 'courseId' },
  scheduleDate: String,
  scheduleHour: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User', localField: 'studentId' },
  status: { type: String, enum:['pending','paid'], default: 'pending'},
  promptpayQRCodeUrl: { type: String },

});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment