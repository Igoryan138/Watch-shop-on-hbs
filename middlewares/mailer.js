const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'wira.watch@mail.ru',
    pass: '0WF6kH7TcxsqrAELMr5x',
  },
},
{
  from: 'Wira Watch <wira.watch@mail.ru>',
},
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.log(err);
    console.log(`Email sent: ${info}`);
  });
};

module.exports = mailer;
