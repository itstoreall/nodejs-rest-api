const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config();

class createSenderSendgrid {
  async send(msg) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    return await sgMail.send({ ...msg, from: 'serhiistanislav@gmail.com' });
  }
}

class createSenderNodemailer {
  async send(msg) {
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: 'goitnodejs@meta.ua',
        pass: process.env.PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
      from: 'goitnodejs@meta.ua',
      ...msg,
    };

    return await transporter.sendMail(emailOptions);
  }
}

module.exports = { createSenderSendgrid, createSenderNodemailer };
