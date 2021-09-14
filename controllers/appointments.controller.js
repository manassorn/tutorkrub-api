const DaoController = require('./dao.controller')
const appointmentsDao = require('../dao/appointments.dao')

class AppointmentsController extends DaoController {
  constructor() {
    super(appointmentsDao)
  }

  async findByAttendee(userId) {
    return await this.dao.findByAttendee(userId)
  }
}

module.exports = appointmentsController = new AppointmentsController()