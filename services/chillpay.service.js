const axios = require('axios')
const crypto = require('crypto');
const firestoreService = require('./firestore.service')


module.exports.pay = async (customerId, orderNo, amount ,ipAddress = '127.0.0.1') => {
  const merchantCode = process.env.CHILLPAY_MERCHANT_CODE
  const apiKey = process.env.CHILLPAY_API_KEY
  const forChecksum = merchantCode +
  orderNo + customerId + amount + 
  'bank_qrcode764TH1' + ipAddress + 
  apiKey + process.env.CHILLPAY_SECRET_KEY
  const checkSum = md5(forChecksum)
  const params = new URLSearchParams()
  params.append('MerchantCode', merchantCode)
  params.append('OrderNo', orderNo)
  params.append('CustomerId', customerId)
  params.append('Amount', amount)
  params.append('ChannelCode', 'bank_qrcode')
  params.append('Currency', '764')
  params.append('LangCode', 'TH')
  params.append('RouteNo', '1')
  params.append('IPAddress', ipAddress)
  params.append('APIKey', apiKey)
  params.append('CheckSum', checkSum)
  
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
  const resp = await axios.post(process.CHILLPAY_URL, params, config)
  return resp;
    

}

function md5(data) {
  crypto.createHash('md5').update(data).digest("hex");
}

async function getOrderNo(userId) {
  const user = await firestoreService.readById('user', userId);
  const nextOrderNo = (!user.orderNo) ? 1 : user.orderNo + 1;
  await firestoreService.update('user', userId, {
    orderNo: nextOrderNo
  })
  return userId + '-' + nextOrderNo;
}