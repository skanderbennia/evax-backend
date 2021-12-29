const router = require('express').Router();
const Citizen = require('../models/Citizen');
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
  const user = citizen.user;

  const filter = {
    _id: user.id,
  };

  try {
    const user_updated = await User.findOneAndUpdate(filter, updateObject);
    console.log(user_updated);
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

module.exports = router;
