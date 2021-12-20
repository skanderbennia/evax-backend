const express = require('express');
const { PythonShell } = require('python-shell');

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
 *         -start_date,
 *         -end_date,
 *         -start_hour,
 *         -end_hour,
 *         -center_id,
 *         -interval,
 *         -center_capacity,
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         start_date:
 *           type: string
 *           description: The appointment start_date
 *         end_date:
 *           type: string
 *           description: The appointment end_date
 *         start_hour:
 *           type: string
 *           description: The appointment start_hour
 *         end_hour:
 *           type: string
 *           description: The appointment end_hour
 *         center_id:
 *           type: string
 *         interval:
 *           type: string
 *         center_capacity:
 *           type: string
 *
 *       example:
 *         start_date: "06/11/2021"
 *         end_date: "06/11/2021"
 *         start_hour: "10:15:00"
 *         end_hour: "19:00:00"
 *         center_capacity: "20"
 *         interval: "10"
 *         center_id: "61869ae67082e5a03d8766b2"
 */

/**
 * @swagger
 * /appointments/:
 *  post:
 *   summary: Creates a new Appointment
 *   tags: [Appointment]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Appointment'
 *
 *   responses:
 *     200:
 *       description: Creates a new Appointment
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Appointment'
 *
 */
router.post('/', async (req, res, next) => {
  console.log(req.body);
  const {
    start_date,
    end_date,
    start_hour,
    end_hour,
    center_id,
    interval,
    center_capacity,
  } = req.body;

  let center;

  try {
    center = await Center.find({
      _id: center_id,
    });
  } catch (error) {
    console.log('here');
    res.status(500).json({
      message: error.message,
    });
  }

  let appointments = [];

  const options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: './appoitments_maker/',
    args: [
      start_date,
      end_date,
      start_hour,
      end_hour,
      interval,
      center_capacity,
      center,
    ],
  };

  PythonShell.run('script.py', options, (err, results) => {
    if (err) throw err;
    appointments = results[0].split(`", "`);

    const filtered_apppointement = appointments[0]
      .slice(1, appointments[0].length - 1)
      .split(`, `);

    filtered_apppointement.forEach(async (elem) => {
      const appointment = elem.slice(1, elem.length - 1).split(` `);
      await Appointment.create({
        date: appointment[0],
        time: appointment[1],
        center_id: center[0]._id.valueOf(),
      });
    });
  });

  res.send('done!');
});

module.exports = router;
