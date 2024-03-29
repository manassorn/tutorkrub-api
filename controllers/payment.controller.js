const paymentDao = require('../dao/payment.dao')
const appointmentDao = require('../dao/appointment.dao')
const notificationCenter = require('../notification/notification-center')

module.exports.updateToPaid = async (paymentId) => {
  let payment = paymentDao.get(paymentId)
  payment.status = 'paid'
  await payment.save()

  const tutor = payment.tutor
  const student = payment.student
  const appointment = await appointmentDao.create({
    course: payment.course,
    scheduleDate: payment.scheduleDate,
    scheduleHour: payment.scheduleHour,
    tutor,
    student
  })

  payment.appointment = appointment._id
  await payment.save()

  notificationCenter.onAppointmentCreated(tutor, student, appointment)
}
