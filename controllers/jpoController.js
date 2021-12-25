const router = require('express').Router();
const Jpo = require('../models/Jpo');

/**
 * @swagger
 * components:
 *   schemas:
 *     Jpo:
 *       type: object
 *       required:
 *         - date
 *         - center_id
 *         - volunteers_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         date:
 *           type: string
 *         center_id:
 *           type: string
 *         volunteers_id:
 *           type: array
 *
 *       example:
 *         date: "25/12/2022"
 *         center_id: "61c0651d8a4a6dbe765ecc96"
 *         volunteers_id: ["61c0651d8a4a6dbe765ecc96", "61c0651d8a4a6dbe765ecc96", "61c0651d8a4a6dbe765ecc96"]
 */

/**
 * @swagger
 * /Jpo/:
 *  post:
 *   summary: Creates a new Jpo
 *   tags: [Jpo]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Jpo'
 *
 *   responses:
 *     201:
 *       description: Creates a new Jpo
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Jpo'
 *
 */
router.post('/', (req, res) => {
  const newJpo = new Jpo(req.body);

  newJpo.save((err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(doc);
  });
});

/**
 * @swagger
 * /Jpo/all:
 *   get:
 *     tags: [Jpo]
 *     description: Get all Jpo
 *     responses:
 *       201:
 *         description: Success
 *
 */
router.get('/all', async (req, res) => {
  try {
    const jpo = await Jpo.find();
    res.json(jpo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
/**
 * @swagger
 * /Jpo/{id}:
 *  get:
 *    summary: Returns the list of Jpo by id
 *    tags: [Jpo]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      200:
 *        description: The list of Jpo by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Jpo'
 *      404:
 *        description: no Jpo
 *
 */

router.get('/:id', async (req, res) => {
  try {
    const jpo = await Jpo.findById(req.params.id);
    if (!jpo) {
      return res.status(404).json({ message: 'Jpo not found' });
    }
    res.status(200).json(jpo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /Jpo/{id}:
 *  put:
 *   summary: Updates Jpo by id
 *   tags: [Jpo]
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
 *          $ref: '#/components/schemas/Jpo'
 *
 *   responses:
 *     200:
 *       description: Updates Jpo by id
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Jpo'
 *
 */
router.put('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };
  const updateObject = req.body;

  try {
    const updated_jpo = await Jpo.findOneAndUpdate(filter, updateObject);
    if (!updated_jpo) {
      return res.status(404).json({ message: 'Jpo no found' });
    }
    res.status(203).json({
      message: 'jpo updated with success',
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /Jpo/{id}:
 *  delete:
 *   summary: Deletes a Jpo
 *   tags: [Jpo]
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
 *       description: Deletes a Jpo
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Jpo'
 *
 */
router.delete('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };

  Jpo.findOneAndDelete(filter, (err, docs) => {
    if (err) {
      return res.status(500).json({
        message: `${err}`,
      });
    }
    if (!docs) return res.status(404).json({ message: 'Jpo not found' });
    return res.status(204).json({
      message: 'Deleted Jpo with success',
    });
  });
});
module.exports = router;
