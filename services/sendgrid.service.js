const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.send = async (to,subject,text) => {
  const msg = {
    to: to,
    // from: 'notifications@tutorkrub.com', // Use the email address or domain you verified above
    from: 'hello@hiscoretutor.com', // Use the email address or domain you verified above
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

