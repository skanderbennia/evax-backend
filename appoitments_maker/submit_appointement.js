const express = require('express');
const Appointment = require('../models/Appointment');
const Center = require('../models/Center');
const User = require('../models/User');

const router = express.Router();

router.post('/center', async (req, res, next) => {
  // choisir la date début et date fin
  const { center_id, date_debut, date_fin } = req.body;
  const date_debut_timestamp = new Date(date_debut);
  const date_fin_timestamp = new Date(date_fin);
  // create apponitment with time and date and add the users and the center id
  console.log(date_fin_timestamp - date_debut_timestamp);
  for (
    let k = date_debut_timestamp.getTime();
    k <= date_fin_timestamp.getTime();
    k += 86400000
  ) {
    // number of appointment per day
    for (let i = 0; i < 20; i += 1) {
      // number of person per appointment
      for (let c = 0; c < 10; c += 1) {
        const timeRendezVous = new Date(1800000 * (i + 14))
          .toString()
          .split(' ')[4];
        console.log(
          `${new Date(k).toISOString().split('T')[0]} ${timeRendezVous}`
        );
        Appointment.create({
          date: new Date(k).toISOString().split('T')[0],
          time: timeRendezVous,
          center_id,
        });
      }
    }
    // console.log(new Date(k).toISOString().split('T')[0]);
  }
  res.send('appointment created');
  // affecter les vaccins au personne non vacciné et trié par trnache d'age
});
module.exports = router;
// lister les personnes sans rendez-vous
