'use server';
import nodemailer from 'nodemailer';

export const onMailer = (email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSOWRD,
    },
  });

  const mailOptions = {
    to: email,
    subject: 'Realtime Support',
    text: 'One of your customers on Zenda AI, just switched to realtime mode',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
