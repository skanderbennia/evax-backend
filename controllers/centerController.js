const router = require('express').Router();
const Center = require('../models/Center');

/**
 * @swagger
 * components:
 *   schemas:
 *     Center:
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
 *           description: The Center name
 *         address:
 *           type: string
 *           description: The Center address
 *         jpo_id:
 *           type: string
 *
 *       example:
 *         name: "Centre Khaznadar"
 *         address: "Khaznadar Bardo"
 *         jpo_id: "12568e7b2971820a1c78294f"
 */

/**
 * @swagger
 * /centers/:
 *  post:
 *   summary: Creates a new Center
 *   tags: [Center]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Center'
 *
 *   responses:
 *     201:
 *       description: Creates a new Center
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Center'
 *
 */
router.post('/', (req, res) => {
  const new_center = new Center(req.body);

  new_center.save((err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(doc);
  });
});

/**
 * @swagger
 * /centers/all:
 *   get:
 *     tags: [Center]
 *     description: Get all centers
 *     responses:
 *       201:
 *         description: Success
 *
 */
router.get('/all', async (req, res) => {
  try {
    const centers = await Center.find();
    res.json(centers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /centers/{id}:
 *  get:
 *    summary: Returns the list of centers by id
 *    tags: [Center]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      201:
 *        description: The list of centers by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Center'
 *      404:
 *        description: no centers
 *
 */

router.get('/:id', async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);
    if (!center) res.status(404).json({ message: 'center not found' });
    res.json(center);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/**
 * @swagger
 * /centers/{id}:
 *  put:
 *   summary: Updates center by id
 *   tags: [Center]
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
 *          $ref: '#/components/schemas/Center'
 *
 *   responses:
 *     201:
 *       description: Updates center by id
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Center'
 *
 */
router.put('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };
  const updateObject = req.body;

  try {
    const center_updated = await Center.findOneAndUpdate(filter, updateObject);
    if (!center_updated) res.status(404).json({ message: 'center not found' });
    res.status(203).json({
      message: 'center updated with success',
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /centers/{id}:
 *  delete:
 *   summary: Deletes a center
 *   tags: [Center]
 *
 *   parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *
 *   responses:
 *     201:
 *       description: Deletes a center
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Center'
 *
 */
router.delete('/:id', async (req, res) => {
  const filter = {
    _id: req.params.id,
  };

  Center.findOneAndDelete(filter, (err, docs) => {
    if (err) {
      return res.status(500).json({
        message: `${err}`,
      });
    }
    if (!docs) return res.status(404).json({ message: 'Center not found' });
    return res.status(201).json({
      message: 'Deleted center with success',
    });
  });
});

module.exports = router;
