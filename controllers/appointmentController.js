const express = require('express');
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');
const Report = require('../models/Report');

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
 *                example: 61c43f9b06fdbbe91b55c3b2
 *              date_suggestion:
 *                 type: string
 *                 example: 2021-12-22
 *              user_id:
 *                 type: string
 *                 example: 61c43f9b06fdbbe91b55c3b2
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
    const appointment_free = await Appointment.findOneAndUpdate(
      {
        user_id: null,
        center_id,
        date: { $gte: transformDate },
      },
      { user_id },
      { new: true }
    );
    res.status(200).json({ data: appointment_free });
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/validate', async (req, res, next) => {
  try {
    const session = await mongoose.startSession();

    const { appointment_id, vaccin_id } = req.body;
    const appointment = await Appointment.findById(appointment_id);
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
    const appointments = await Appointment.find({ user_id: { $ne: null } });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
