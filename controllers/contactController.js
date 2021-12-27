const router = require('express').Router();
const sendMail = require('../utils/mailer');

router.post('/', (req, res) => {
  sendMail(
    req.body.email,
    'evaxdelatunisie@gmail.com',
    'Contact',
    req.body.message,
    (err, data) => {
      if (err) {
        res.status(500).send('something is wrong');
      } else {
        res.status(200).send('mail sent');
      }
    }
  );
});
module.exports = router;
