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

const sendMail = async (sender, receiver, subject, msg, cb) => {
  await transporter.sendMail(
    {
      from: sender,
      to: receiver,
      subject: `${subject} receiver : ${receiver}  sender: ${sender}`,
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
