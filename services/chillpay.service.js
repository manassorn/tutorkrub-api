const axios = require('axios')
const crypto = require('crypto');


module.exports.pay = async (customerId, orderNo, amount ,ipAddress = '127.0.0.1') => {
  const merchantCode = process.env.CHILLPAY_MERCHANT_CODE
  const apiKey = process.env.CHILLPAY_API_KEY
  const forChecksum = merchantCode +
  orderNo + customerId + amount + 
  'bank_qrcode764TH1' + ipAddress + 
  apiKey + process.env.CHILLPAY_SECRET_KEY
  console.log(forChecksum)
  const checkSum = md5(forChecksum)
  console.log(checkSum);
  const params = new URLSearchParams()
  params.append('MerchantCode', merchantCode)
  params.append('OrderNo', orderNo)
  params.append('CustomerId', customerId)
  params.append('Amount', amount)
  params.append('PhoneNumber', '')
  params.append('Description', '')
  params.append('ChannelCode', 'bank_qrcode')
  params.append('Currency', '764')
  params.append('LangCode', 'TH')
  params.append('RouteNo', '1')
  params.append('IPAddress', ipAddress)
  params.append('APIKey', apiKey)
  params.append('TokenFlag', '')
  params.append('CreditToken', '')
  params.append('CreditMonth', '')
  params.append('ShopID', '')
  params.append('ProductImageUrl', '')
  params.append('CheckSum', checkSum)
  
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
  const resp = await axios.post(process.env.CHILLPAY_URL, params, config)
  return resp;
    

}

function md5(data) {
  return crypto.createHash('md5').update(data).digest("hex");
}
