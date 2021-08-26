const Appointment = require('./mongoose/models/Appointment')

module.exports.getMessagesByAppointmentId = async (apmId) => {
  const appointment = await Appointment.findById(apmId).exec()
  if (appointment && appointment.messages) {
    return appointment.messages
  } else {
    return []
  }
}

module.exports.getListByUserId = async (userId) => {
  const appointment1 = await Appointment.find({tutor: userId}).exec()
  const appointment2 = await Appointment.find({student: userId}).exec()
  return appointment1.concat(appointment2)
}

module.exports.create = async (courseId, startTime, studentId) => {
  const appointment = new Appointment({
    'course': courseId,
    'startTime': startTime,
    'period': 1,
    'student': studentId
  });
  await appointment.save()
  return appointment
}

module.exports.get = async (apmId) => {
  const appointment = await Appointment.findById(apmId).exec()
  return appointment
}

module.exports.addMessage = async (apmId, userId, text) => {
  const message = {from: userId, timestamp: new Date(), text}
  Appointment.findOneAndUpdate(
    { _id: apmId },
    { $push: { messages: message } }
  );
}