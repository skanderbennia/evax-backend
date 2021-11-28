const router = require('express').Router();
const Volunteer = require('../models/Volunteer');

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
 *           type: integer
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
 *         firstName: "Nour El Houda "
 *         lastName: "Boumenjel"
 *         age: 53
 *         phoneNumber: "1234567"
 *         cin: "12345678"
 *         operator: true
 *         volunteer_team: "Tunisian Red Crescent"
 */

/**
 * @swagger
 * /volunteers/:
 *  post:
 *   summary: Creates a new volunteer
 *   tags: [Volunteer]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Volunteer'
 *
 *   responses:
 *     201:
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
  
  const new_volunteer = new Volunteer(req.body);

  new_volunteer.save((err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    return res.status(201).send(doc);
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
 *    summary: Returns the list of volunteer by id
 *    tags: [Volunteer]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      200:
 *        description: The list of volunteer by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Volunteer'
 *      404:
 *        description: no volunteer
 *
 */

router.get('/:id', async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(
      req.params.id
    );
    if(!volunteer) return  res.status(404).json({message : "volunteer not found"});
    res.status(200).json(volunteer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /volunteers/{id}:
 *  put:
 *   summary: Updates volunteer by id
 *   tags: [Volunteer]
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
 *          $ref: '#/components/schemas/Volunteer'
 *
 *   responses:
 *     203:
 *       description: Updates volunteer by id
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Volunteer'
 *
 */
router.put('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };
  const updateObject = req.body;

  try {
  const volunteer =  await  Volunteer.findOneAndUpdate(filter, updateObject);
  if(!volunteer) return  res.status(404).json({message : "volunteer not found"});
    res.status(203).json({
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
 *     204:
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
    if(!docs) return  res.status(404).json({message : "volunteer not found"});
    return res.status(204).json({
      message: 'Deleted Volunteer with success',
    });
  });
});

module.exports = router;
