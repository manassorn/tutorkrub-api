const appointmentDao = require('../dao/appointment.dao')
const STATUSES = appointmentDao.STATUSES

module.exports.findActionNeeded = (userId) => {
  appointmentDao.find({
    $or: [
      {tutor: userId, status: STATUSES.ACCEPTANCE_PENDING},
      {student: userId, status: STATUSES.LESSON_COMPLETED}
    ]
  })
}