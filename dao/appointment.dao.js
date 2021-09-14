const BaseDao = require('./base.dao')

const Appointment = require('./mongoose/models/Appointment')

class AppointmentDao extends BaseDao {
  constructor() {
    super(Appointment)
  }
  async findByAttendee(userId) {
    return await Appointment.find()
    .or({tutor: userId}, {student: userId})
  }
}

const appointmentDao = new AppointmentDao()
module.exports = appointmentDao