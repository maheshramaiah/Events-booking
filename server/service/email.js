const nodemailer = require('nodemailer');

async function sendEmail(emails, { subject, text }) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASS
      }
    });
    const info = await transporter.sendMail({
      from: 'eventsbooking@gmail.com',
      to: emails.toString(),
      subject,
      text
    });

    return info.messageId;
  }
  catch (err) {
    throw err;
  }
}

module.exports = {
  sendEmail
};