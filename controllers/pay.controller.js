var chillpayService = require('../services/chillpay.service')

module.exports.pay = async (customerId, amount) => {
  
  const snapshot = await chillpayService.pay(customerId, amount)

  const users = snapshot.docs.map(doc => {
    const id = doc.id
    const data = doc.data()
    return {id, ...data}
  });
  return users[0];
}

module.exports.testPay = async (amount) => {
  
  const snapshot = await chillpayService.pay('pun', 500)

}
