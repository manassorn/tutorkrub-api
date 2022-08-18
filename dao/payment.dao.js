const BaseDao = require('./base.dao')

const Payment = require('./mongoose/models/Payment')

class PaymentDao extends BaseDao {
  constructor() {
    super(Payment)
  }
  async findPayment(userId, courseId, scheduleDate, scheduleHour) {
    return await Payment.findOne({
      course: courseId,
      scheduleDate,
      scheduleHour,
      user: userId,
    })
  }
}

const paymentDao = new PaymentDao()
module.exports = paymentDao