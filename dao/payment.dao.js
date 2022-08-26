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
  async createIfNotExists(userId, courseId, amount, scheduleDate, scheduleHour) {
    const data = {
      user: userId,
      course: courseId,
      amount,
      scheduleDate,
      scheduleHour
    }
    const query = data
    return await Payment.findOneAndUpdate(query, data, {upsert: true, new: true}).exec();
  }
}

const paymentDao = new PaymentDao()
module.exports = paymentDao