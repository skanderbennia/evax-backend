const express = require('express');
const Appointment = require('../models/Appointment');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       required:
 *         -date,
 *         -time,
 *         -center_id,
 *         -user_id,
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         date:
 *           type: string
 *           description: The appointment start_date
 *         time:
 *           type: string
 *           description: the appointment time
 *         center_id:
 *           type: string
 *         user_id:
 *           type: string
 *
 *       example:
 *         id: "61869ae67082e5a03d8766b2"
 *         date: "2021-12-22"
 *         time: "13:00:00"
 *         user_id: "61869ae67082e5a03d8766b2"
 *         center_id: "61869ae67082e5a03d8766b2"
 */

/**
 * @swagger
 * /appointments/center:
 *  post:
 *   summary: Creates a new Appointments
 *   tags: [Appointment]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          properties:
 *              center_id:
 *                type: string
 *                example: 61c43f9b06fdbbe91b55c3b2
 *              date_debut:
 *                 type: string
 *                 example: 2021-12-22
 *              date_fin:
 *                 type: string
 *                 example: 2021-12-24
 *
 *
 *   responses:
 *     200:
 *       description: Creates a new Appointment
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: appointement created !
 *
 */
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
        // console.log(
        //   `${new Date(k).toISOString().split('T')[0]} ${timeRendezVous}`
        // );
        const appointment = Appointment({
          date: new Date(k),
          time: timeRendezVous,
          center_id,
        });
        appointment.save();
      }
    }
    // console.log(new Date(k).toISOString().split('T')[0]);
  }
  res.send('appointment created');
  // affecter les vaccins au personne non vacciné et trié par trnache d'age
});
module.exports = router;
// lister les personnes sans rendez-vous
