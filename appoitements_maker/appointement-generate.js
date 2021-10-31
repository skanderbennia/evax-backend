const express = require('express');
const { PythonShell } = require('python-shell');
const Appointement = require('../models/Appointment');

const router = express.Router();
router.get('/appointements', (req, res, next) => {
  const center_id = 1;
  let appointments = [];

  const options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './appoitements_maker/',
    args: ['12/1/2021', '12/1/2021', '10:00:00', '11:00:00', 30, 2],
  };

  PythonShell.run('script.py', options, (err, results) => {
    if (err) throw err;
    appointments = results[0].split(`", "`);
    const filtered_apppointement = appointments[0]
      .slice(1, appointments[0].length - 1)
      .split(`, `);
    let index = 0;
    filtered_apppointement.forEach(async (elem) => {
      const appointement = elem.slice(1, elem.length - 1).split(` `);
      await Appointement.create({
        date: appointement[0],
        time: appointement[1],
      });
      index += 1;
      if (index <= filtered_apppointement.length) res.send('done!');
    });
  });
});
module.exports = router;
