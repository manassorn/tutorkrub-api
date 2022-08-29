const sgMail = require('@sendgrid/mail');

const conf = require('../conf/sendgrid.json')

sgMail.setApiKey(conf.apiKey);

module.exports.send = async (to,subject,text) => {
  const msg = {
    to: to,
    from: 'notifications@tutorkrub.com', // Use the email address or domain you verified above
    subject: subject,
    text: text,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

