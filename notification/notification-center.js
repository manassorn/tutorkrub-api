var sendgrid = require('../services/sendgrid.service')
var templateEngine = require('./email-template/template-engine')
var loginAccountDao = require('../dao/loginAccount.dao')

async function sendEmail(userId, templateName, data) {
  const loginAccount = await loginAccountDao.getByUser(userId)
  const emailAddress = loginAccount.email
  // const emailAddress = 'manassorn@gmail.com'
  console.log('emailAddress',emailAddress,userId)
  const subject = templateEngine.hbsTemplate(templateName + '-subject')
  const body = templateEngine.hbsTemplate(templateName)
  await sendgrid.send(emailAddress,subject,body)
}

function createNotification(userId, messageHeader, messageBody) {

}

module.exports.onAppointmentCreated = (tutor, student, appointment) => {
  createNotification()
  sendEmail(tutor,'appointment-created-tutor', {})
}