// const express = require('express');
// const { PythonShell } = require('python-shell');

// const Appointment = require('../models/Appointment');
// const Center = require('../models/Center');

// const router = express.Router();

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Appointment:
//  *       type: object
//  *       required:
//  *         -date,
//  *         -time,
//  *         -center_id,
//  *         -user_id,
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The auto-generated id of the instance (project)
//  *         date:
//  *           type: string
//  *           description: The appointment start_date
//  *         time:
//  *           type: string
//  *           description: The appointment end_date
//  *         center_id:
//  *           type: string
//  *         user_id:
//  *           type: string
//  *
//  *       example:
//  *         id: "61869ae67082e5a03d8766b2"
//  *         date: "2021-12-22"
//  *         time: "13:00:00"
//  *         user_id: "61869ae67082e5a03d8766b2"
//  *         center_id: "61869ae67082e5a03d8766b2"
//  */

// /**
//  * @swagger
//  * /appointments/:
//  *  post:
//  *   summary: Creates a new Appointment
//  *   tags: [Appointment]
//  *
//  *   requestBody:
//  *    required: true
//  *    content:
//  *      application/json:
//  *        schema:
//  *          properties:
//  *              center_id:
//  *                type: string
//  *                example: 61c43f9b06fdbbe91b55c3b2
//  *              date_debut:
//  *                 type: string
//  *                 example: 2021-12-22
//  *              date_fin:
//  *                 type: string
//  *                 example: 2021-12-24
//  *              date_fin:
//  *                 type: string
//  *                 example: 61c43f9b06fdbbe91b55c3b2
//  *   responses:
//  *     200:
//  *       description: Creates a new Appointment
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: array
//  *             items:
//  *               $ref: '#/components/schemas/Appointment'
//  *
//  */
// router.post('/', async (req, res, next) => {
//   console.log(req.body);
//   const {
//     start_date,
//     end_date,
//     start_hour,
//     end_hour,
//     center_id,
//     interval,
//     center_capacity,
//   } = req.body;

//   let center;

//   try {
//     center = await Center.find({
//       _id: center_id,
//     });
//   } catch (error) {
//     console.log('here');
//     res.status(500).json({
//       message: error.message,
//     });
//   }

//   let appointments = [];

//   const options = {
//     mode: 'text',
//     pythonPath: '/usr/bin/python',
//     pythonOptions: ['-u'], // get print results in real-time
//     scriptPath: './appoitments_maker/',
//     args: [
//       start_date,
//       end_date,
//       start_hour,
//       end_hour,
//       interval,
//       center_capacity,
//       center,
//     ],
//   };

//   PythonShell.run('script.py', options, (err, results) => {
//     if (err) throw err;
//     appointments = results[0].split(`", "`);

//     const filtered_apppointement = appointments[0]
//       .slice(1, appointments[0].length - 1)
//       .split(`, `);

//     filtered_apppointement.forEach(async (elem) => {
//       const appointment = elem.slice(1, elem.length - 1).split(` `);
//       await Appointment.create({
//         date: appointment[0],
//         time: appointment[1],
//         center_id: center[0]._id.valueOf(),
//       });
//     });
//   });

//   res.send('done!');
// });

// module.exports = router;
