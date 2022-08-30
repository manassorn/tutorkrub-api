const DaoController = require('./dao.controller')
const appointmentDao = require('../dao/appointment.dao')

class AppointmentsController extends DaoController {
  constructor() {
    super(appointmentDao)
  }

  async findByAttendee(userId) {
    return await this.dao.findByAttendee(userId)
  }
}

module.exports = appointmentsController = new AppointmentsController()