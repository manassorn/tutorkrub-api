const DaoController = require('./dao.controller')
const appointmentDao = require('../dao/appointment.dao')

class AppointmentController extends DaoController {
  constructor() {
    super(appointmentDao)
  }

  async findByAttendee(userId) {
    return await this.dao.findByAttendee(userId)
  }
}

module.exports = appointmentController = new AppointmentController()