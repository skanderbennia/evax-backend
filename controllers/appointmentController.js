const express = require('express');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Report = require('../models/Report');
const User = require('../models/User');
const sendMail = require('../utils/mailer');

const router = express.Router();
/**
 * @swagger
 * /appointments/book:
 *  post:
 *   summary: Book the closest appointment for a user in a specific center and after 2 day
 *   tags: [Appointment]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *              center_id:
 *                type: string
 *                example: 61c0651d8a4a6dbe765ecc96
 *              date_suggestion:
 *                 type: string
 *                 example: 2021-12-22
 *              user_id:
 *                 type: string
 *                 example: 61d045db3e56df0fcec48471
 *
 *   responses:
 *     200:
 *       description: return the closest free appointment
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  $ref: '#/components/schemas/Appointment'
 *
 */
router.post('/book', async (req, res, next) => {
  try {
    const { center_id, date_suggestion, user_id } = req.body;
    // add 2 day to the date
    const transformDate = new Date(
      new Date(date_suggestion).getTime() + 86400000 * 2
    );
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    const query = {
      reported: false,
      validated: false,
      user_id,
    };
    const user_got_appointment = await Appointment.find(query);

    if (user_got_appointment.length !== 0) {
      return res
        .status(404)
        .json({ message: 'you already have an appointment' });
    }
    const appointment_free = await Appointment.findOneAndUpdate(
      {
        user_id: null,
        center_id,
        date: { $gte: transformDate },
      },
      { user_id },
      { new: true }
    );
    if (!appointment_free) {
      return res
        .status(404)
        .json({ message: 'there is no appointment for this date' });
    }
    console.log(appointment_free);
    sendMail(
      'evaxdelatunisie@gmail.com',
      user.email,
      'Prise de rendez-vous',
      `la date de votre prochain rendez-vous sera ${appointment_free.date.toDateString()}à ${
        appointment_free.time
      }`
    );
    res.status(200).json({ data: appointment_free });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /appointments/validate:
 *  post:
 *   summary: the operator validate an appointment for a user
 *   tags: [Appointment]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *              appointment_id:
 *                type: string
 *                example: 61c43f9b06fdbbe91b55c3b2
 *              vaccin_id:
 *                 type: string
 *                 example: 61c1f91f212ef4299e572c11
 *
 *   responses:
 *     200:
 *       description: validate appointment
 *       content:
 *         application/json:
 *           schema:
 *              type: string
 *              example: Appointment Validated !
 */
router.post('/validate', async (req, res, next) => {
  try {
    const session = await mongoose.startSession();

    const { appointment_id, vaccin_id } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointment_id, {
      validated: true,
    });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await session.withTransaction(async () => {
      const report = new Report({
        user_id: appointment.user_id,
        appointment_id: appointment._id,
        vaccin_id,
      });
      report.save();
    });
    res.status(200).json({ message: 'appointment validated' });
    session.endSession();
  } catch (err) {
    res.status(500).send(err);
  }
});
/**
 * @swagger
 * /appointments/all:
 *   get:
 *     tags: [Appointment]
 *     description: Get all Appointment
 *     responses:
 *       201:
 *         description: Success
 *
 */
router.get('/all', async (req, res, next) => {
  try {
    const appointments = await Appointment.find({
      user_id: { $ne: null },
      validated: false,
      reported: false,
    }).populate('user_id');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get('/report', async (req, res, next) => {
  try {
    const sysdat = new Date();
    // find person who go appointment out dated
    const appointments = await Appointment.find({
      date: { $lte: sysdat },
      reported: false,
      user_id: { $ne: null },
    });
    console.log(appointments);
    appointments.forEach(async (appointment) => {
      await Appointment.findOneAndUpdate(
        {
          date: {
            $gte: new Date(new Date(appointment.date).getTime() + 86400000 * 7),
          },
          user_id: null,
        },
        { user_id: appointment.user_id }
      );
      await Appointment.findByIdAndUpdate(appointment._id, { reported: true });
    });
    // add 7 days to the date of their appointment
    // check if an appointment after 7 days exist or not
    // affect
    if (appointments.length === 0) {
      return res.status(200).json({
        message:
          'no appointment to report or no free appointment please generate',
      });
    }
    return res.status(200).json({ message: 'appointment reported' });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
