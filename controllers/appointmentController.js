const express = require('express');
const Appointment = require('../models/Appointment');

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
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Appointment'
 *
 */
router.post('/book', async (req, res, next) => {
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
  res.send(appointment_free);
});

module.exports = router;
