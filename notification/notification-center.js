var sendgrid = require('../services/sendgrid.service')
var templateEngine = require('./email-template/template-engine')
var loginAccountDao = require('../dao/loginAccount.dao')

function sendEmail(userId, templateName, data) {
  const emailAddress = loginAccountDao.getByUser(userId).email
  const subject = templateEngine.hbsTemplate(templateName + '-subject')
  const body = templateEngine.hbsTemplate(templateName)
  sendgrid.send(emailAddress,subject,body)
}

function createNotification(userId, messageHeader, messageBody) {

}

module.exports.whenAppointmentCreated = (tutor, student, appointment) => {
  createNotification()
  sendEmail(tutor,'appointment-created-tutor', {})
}