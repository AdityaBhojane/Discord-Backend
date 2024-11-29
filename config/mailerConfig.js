import nodemailer from 'nodemailer'

export default nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "discordprojectmanager@gmail.com",
      pass: "wuvq yhef dpoz sgtu",
    },
  });