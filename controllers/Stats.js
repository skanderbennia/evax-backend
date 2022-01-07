const router = require('express').Router();
const Appointment = require('../models/Appointment');
const Center = require('../models/Center');
const Volunteer = require('../models/Volunteer');
const Operator = require('../models/Operator');
const Citizen = require('../models/Citizen');

/**
 * @swagger
 * components:
 *   schemas:
 *     Stats:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - jpo_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         name:
 *           type: string
 *           description: The Stats name
 *         address:
 *           type: string
 *           description: The Stats address
 *         jpo_id:
 *           type: string
 *
 */

/**
 * @swagger
 * /stats:
 *   get:
 *     tags: [Stats]
 *     description: Application Stats
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/', async (req, res) => {
  try {
    const all_vaccinated = await Appointment.count({
      user_id: { $ne: null },
    });

    const appointments_per_center = await Appointment.aggregate([
      { $group: { _id: '$center_id', Appointments: { $sum: 1 } } },
    ]);

    const vaccinated_by_center = await Appointment.aggregate([
      {
        $group: {
          _id: '$center_id',
          Vaccinated: {
            $sum: { $cond: [{ $eq: ['$validated', true] }, 1, 0] },
          },
        },
      },
    ]);

    const volunteers_by_association = await Volunteer.aggregate([
      { $group: { _id: '$volunteer_team', sum: { $sum: 1 } } },
    ]);

    const all_operators = await Operator.count({
      user_id: { $ne: null },
    });

    const all_citizens = await Citizen.count();

    res.json([
      all_vaccinated,
      appointments_per_center,
      vaccinated_by_center,
      volunteers_by_association,
      operators,
    ]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
