const router = require('express').Router();
const VaccineCenter = require('../models/VaccineCenter');

/**
 * @swagger
 * components:
 *   schemas:
 *     VaccineCenter:
 *       type: object
 *       required:
 *         - quantity
 *         - vaccine_id
 *         - center_id
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         quantity:
 *           type: number
 *           description: The Quantity
 *         vaccine_id:
 *           type: string
 *         center_id:
 *           type: string
 *
 *       example:
 *         quantity: 42
 *         vaccine_id: "12568e7b2971820a1c78274f"
 *         center_id: "12568e7b2971820a1c78294f"
 */

/**
 * @swagger
 * /VaccineCenter/:
 *  post:
 *   summary: Creates a new VaccineCenter
 *   tags: [VaccineCenter]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/VaccineCenter'
 *
 *   responses:
 *     201:
 *       description: Creates a new VaccineCenter
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/VaccineCenter'
 *
 */
 router.post('/', (req, res) => {
    const new_vaccinecenter = new Center(req.body);
  
    new_vaccinecenter.save((err, doc) => {
      if (err) {
        return res.status(500).send(err);
      }
      
      return res.status(201).send(doc);
    });
  });
  
  /**
   * @swagger
   * /VaccineCenter/all:
   *   get:
   *     tags: [VaccineCenter]
   *     description: Get all VaccineCenter
   *     responses:
   *       201:
   *         description: Success
   *
   */
  router.get('/all', async (req, res) => {
    try {
      const vaccinecenter = await VaccineCenter.find();
      res.json(vaccinecenter);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });
  
module.exports = router;