const router = require('express').Router();
const Citizen = require('../models/Citizen');
const Report = require('../models/Report');
const User = require('../models/User');

/**
 * @swagger
 * components:
 *   schemas:
 *     Citizen:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         name:
 *           type: string
 *           description: The Citizen name
 *         email:
 *           type: string
 *           description: The Citizen email
 *         address:
 *           type: string
 *           description: The Citizen address
 *         phone:
 *           type: string
 *           description: The Citizen phone number
 *
 */
/**
 * @swagger
 * /Citizen/all:
 *   get:
 *     tags: [Citizen]
 *     description: Get all Citizen
 *     responses:
 *       201:
 *         description: Success
 *
 */
router.get('/all', async (req, res) => {
  try {
    const citizen = await Citizen.find().populate('user');
    res.json(citizen);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /Citizen/{id}:
 *  get:
 *    summary: Returns the list of Citizens by id
 *    tags: [Citizen]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      201:
 *        description: The list of Citizens by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Citizen'
 *      404:
 *        description: no Citizens
 *
 */

router.get('/:id', async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id).populate('user');
    if (!citizen) res.status(404).json({ message: 'Citizen not found' });
    res.json(citizen);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /Citizen/{id}:
 *  put:
 *   summary: Updates Citizen by id
 *   tags: [Citizen]
 *   parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Citizen'
 *
 *   responses:
 *     201:
 *       description: Updates Citizen by id
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Citizen'
 *
 */
router.put('/:id', async (req, res) => {
  const updateObject = req.body;
  const citizen = await Citizen.findById(req.params.id).populate('user');
  const { user } = citizen;

  const filter = {
    _id: user.id,
  };

  try {
    const user_updated = await User.findOneAndUpdate(filter, updateObject);

    if (!user_updated) {
      res.status(404).json({ message: 'User not found' });
    }

    res.status(203).json({
      message: 'User updated with success',
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /Citizen/{id}/report:
 *  get:
 *    summary: Returns the Citizen's report by id
 *    tags: [Citizen]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      201:
 *        description: The Citizen's report by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Citizen'
 *      404:
 *        description: no Citizens
 *
 */

router.get('/:id/report', async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.params.id).populate('user');

    /*const report = await Report.find({
      user_id: citizen.user._id,
    })
      .populate({ path: 'user_id', select: ['_id'] })
      .populate({ path: 'vaccin_id', select: ['_id'] })
      .populate({
        path: 'appointment_id',
        populate: {
          path: 'centers',
        },
      });*/

    const report = await Report.find({
      user_id: citizen.user._id,
    }).populate([
      {
        path: 'user_id',
      },
      {
        path: 'vaccin_id',
      },
      {
        path: 'appointment_id',
        populate: {
          path: 'center_id',
        },
      },
    ]);

    res.status(200).json({ data: report });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports = router;
