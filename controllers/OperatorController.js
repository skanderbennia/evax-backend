const router = require('express').Router();
const mongoose = require('mongoose');
const Operator = require('../models/Operator');
const User = require('../models/User');
/**
 * @swagger
 * components:
 *   schemas:
 *     Operator:
 *       type: object
 *       required:
 *         - user_id
 *         - center_id
 *       properties:
 *         user_id:
 *           type: string
 *           description: user id of the account
 *         center_id:
 *           type: string
 *           description: id of center where the operator belongs

 *
 *       example:
 *         user_id: "61c43f9b06fdbbe91b55c3b2"
 *         center_id: "61c43f9b06fdbbe91b55c3b2"
 */

/**
 * @swagger
 * /operator/:
 *  post:
 *   summary: Creates a new Operator
 *   tags: [Operator]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: nameExample
 *              email:
 *                  type: string
 *                  example: email@gmail.com
 *              password:
 *                  type: string
 *                  example: 12345678
 *              phone:
 *                  type: string
 *                  example: 12345678
 *              address:
 *                  type: string
 *                  example: Ariana
 *              role:
 *                  type: string
 *                  example: operator
 *   responses:
 *     200:
 *       description: Creates a new Operator
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Operator'
 *
 */
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const user_account = await User.create(req.body);
      const new_operator = await Operator.create({
        user_id: user_account._id,
      });
      const created_operator = await Operator.findById(
        new_operator._id
      ).populate('user_id');
      res.status(200).json({ operator: created_operator });
    });

    session.endSession();
  } catch (err) {
    console.log(err);
  }
});

/**
 * @swagger
 * /operator/all:
 *   get:
 *     tags: [Operator]
 *     description: Get all operators
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/all', async (req, res) => {
  try {
    const operators = await Operator.find().populate('user_id');
    res.json(operators);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /operator/{id}:
 *  get:
 *    summary: Returns the list of operator by id
 *    tags: [Operator]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      200:
 *        description: The list of operator by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Operator'
 *      404:
 *        description: no operators
 *
 */

router.get('/:id', async (req, res) => {
  try {
    const operator = await Operator.findById(req.params.id).populate('user_id');
    if (!operator) {
      return res.status(404).json({ message: 'operator not found' });
    }
    res.status(200).json(operator);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /operator/{id}:
 *  put:
 *   summary: Updates operator by id
 *   tags: [Operator]
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
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  example: nameExample
 *              email:
 *                  type: string
 *                  example: email@gmail.com
 *              password:
 *                  type: string
 *                  example: 12345678
 *              phone:
 *                  type: string
 *                  example: 12345678
 *              address:
 *                  type: string
 *                  example: Ariana
 *              role:
 *                  type: string
 *                  example: operator
 *
 *   responses:
 *     200:
 *       description: Updates Operator by id
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Operator'
 *
 */
router.put('/:id', async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.withTransaction(async () => {
      const selected_operator = await Operator.findById(req.params.id);
      if (!selected_operator) {
        res.status(404).json({ message: 'operator not found' });
      }
      await User.findByIdAndUpdate(selected_operator.user_id, req.body);

      const updated_operator = await Operator.findById(
        selected_operator._id
      ).populate('user_id');
      res.status(201).json({ operator: updated_operator });
    });

    session.endSession();
  } catch (err) {
    console.log(err);
  }
});

/**
 * @swagger
 * /operator/{id}:
 *  delete:
 *   summary: Deletes a Operator
 *   tags: [Operator]
 *
 *   parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *
 *   responses:
 *     200:
 *       description: Deletes a Operator
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Operator'
 *
 */
router.delete('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };

  Operator.findOneAndDelete(filter, (err, docs) => {
    if (err) {
      return res.status(500).json({
        message: `${err}`,
      });
    }
    if (!docs) return res.status(404).json({ message: 'operator not found' });
    return res.status(204).json({
      message: 'Deleted operator with success',
    });
  });
});

module.exports = router;
