const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'evaxdelatunisie@gmail.com',
    pass: 'evax1234',
  },
});

const sendMail = async (email, msg, cb) => {
  await transporter.sendMail(
    {
      from: email,
      to: 'evaxdelatunisie@gmail.com',
      subject: `Hello ✔${email}`,
      text: msg,
    },
    (err, data) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, data);
      }
    }
  );
};
module.exports = sendMail;
