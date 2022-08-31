const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.send = async (to,subject,html) => {
  const msg = {
    to: to,
    from: {
      email: 'notification@tutorkrub.com',
      name: 'TutorKrub'
    },
    subject: subject,
    html: html,
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

