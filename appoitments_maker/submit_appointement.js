const express = require('express');
const Appointment = require('../models/Appointment');
const Center = require('../models/Center');

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
 *                example: 61c0651d8a4a6dbe765ecc96
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
 *             type: object
 *             properties:
 *               message:
 *                  type: string
 *                  example: appointment created !
 *               date_already_created:
 *                  type: array
 *                  items:
 *                    type: string
 *                    example: 2021-12-23T00:00:00.000Z
 *
 */
router.post('/center', async (req, res, next) => {
  // choisir la date début et date fin
  try {
    const date_already_created = [];
    const { center_id, date_debut, date_fin } = req.body;
    const date_debut_timestamp = new Date(date_debut);
    const date_fin_timestamp = new Date(date_fin);
    const center = await Center.findById(center_id);

    // create apponitment with time and date and add the users and the center id
    if (!date_debut) {
      return res.status(500);
    }

    for (
      let k = date_debut_timestamp.getTime();
      k <= date_fin_timestamp.getTime();
      k += 86400000
    ) {
      Appointment.find({ date: new Date(k) })
        .limit(1)
        .then((result) => {
          console.log(result.length);
          if (result.length === 0) {
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
                  center_name: center.id,
                });
                appointment.save();
              }
            }
          } else {
            date_already_created.push(new Date(k));
            console.log(date_already_created);
          }
        });
      // number of appointment per day

      // console.log(new Date(k).toISOString().split('T')[0]);
    }
    res
      .status(200)
      .json({ message: 'appointments created', date_already_created });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
// lister les personnes sans rendez-vous
