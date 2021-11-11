

const router = require('express').Router();
const Volunteer= require('../models/Volunteer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Volunteer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - age
 *         - phoneNumber
 *         - cin
 *         - operator
 *         - volunteer_team
 * 
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         firstName:
 *           type: string
 *           description: The Volunteer firstName
 *         lastName:
 *           type: string
 *           description: The Volunteer lasttName
 *         age:
 *           type: string
 *           description: The Volunteer age
 *         phoneNumber:
 *           type: string
 *           description: The Volunteer phoneNumber
 *         cin:
 *           type: string
 *           description: The Volunteer cin
 * 
 *         operator:
 *           type: boolean
 *           description: The Volunteer is an operator or not
 *         volunteer_team:
 *           type: string
 *           description: The Volunteer team
 *
 *       example:
 *         firstName: "Centre Khaznadar"
 *         lastName: "Khaznadar Bardo"
 *         age: "12568e7b2971820a1c78294f"
 *         phoneNumber: "1234567"
 *         cin: "12345678"
 *         operator: true
 *         volunteer_team: "Tunisian Red Crescent"
 */

/**
 * * @swagger
 * /volunteers/:
 *  post:
 *   summary: Creates a new Volunteer
 *   tags: [volunteer]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Volunteer'
 *
 *   responses:
 *     200:
 *       description: Creates a new Volunteer
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Volunteer'
 *
 */


router.post('/', (req, res) => {
  console.log(req.body);
  const new_volunteer = new Volunteer(req.body);

  new_volunteer.save((err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log('Volunteer added with success');
    return res.status(200).send(doc);
  });
});

/**
 * @swagger
 * /volunteers/all:
 *   get:
 *     tags: [Volunteer]
 *     description: Get all volunteers
 *     responses:
 *       200:
 *         description: Success
 *
 */

router.get('/all', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /volunteers/{id}:
 *  get:
 *    summary: Returns the list of volunteers by id
 *    tags: [Volunteer]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      200:
 *        description: The list of volunteers by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Instance'
 *      404:
 *        description: no volunteers
 *
 */
router.put('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };
  const updateObject = req.body;

  try {
    await Volunteer.findOneAndUpdate(filter, updateObject);
    res.status(500).json({
      message: 'Volunteer updated with success',
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /volunteers/{id}:
 *  delete:
 *   summary: Deletes a volunteer
 *   tags: [Volunteer]
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
 *       description: Deletes a volunteer
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Volunteer'
 *
 */

router.delete('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };

  Volunteer.findOneAndDelete(filter, (err, docs) => {
    if (err) {
      return res.status(500).json({
        message: `${err}`,
      });
    }
    return res.status(200).json({
      message: 'Deleted Volunteer with success',
    });
  });
});

module.exports = router;
