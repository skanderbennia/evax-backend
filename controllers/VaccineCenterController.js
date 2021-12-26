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
    const new_vaccinecenter = new VaccineCenter(req.body);
  
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
  /**
 * @swagger
 * /VaccineCenter/{id}:
 *  get:
 *    summary: Returns the list of VaccineCenter by id
 *    tags: [VaccineCenter]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      200:
 *        description: The list of VaccineCenter by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/VaccineCenter'
 *      404:
 *        description: no VaccineCenter
 *
 */

 router.get('/:id', async (req, res) => {
  try {
      const vaccinecenter = await VaccineCenter.findById(req.params.id);
      if(!vaccinecenter){
          return res.status(404).json({message:"VaccineCenter not found"})
      }
      res.status(200).json(vaccinecenter);
  } catch (error) {
      res.status(500).json({
          message: error.message,
      });
  }
});

/**
* @swagger
* /VaccineCenter/{id}:
*  put:
*   summary: Updates VaccineCenter by id
*   tags: [VaccineCenter]
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
*          $ref: '#/components/schemas/VaccineCenter'
*
*   responses:
*     200:
*       description: Updates VaccineCenter by id
*       content:
*         application/json:
*           schema:
*             type: array
*             items:
*               $ref: '#/components/schemas/VaccineCenter'
*
*/
router.put('/:id', async (req, res) => {
  const filter = {
      _id: req.params.id,
  };
  const updateObject = req.body;

  try {
       const updatedVaccineCenter = await VaccineCenter.findOneAndUpdate(filter, updateObject);
      if(!updatedVaccineCenter){
          return res.status(404).json({message:"VaccineCenter no found"})
      }
      res.status(201).json({
          message: 'VaccineCenter updated with success',
      });
  } catch (err) {
      res.status(500).send(err);
  }
});

/**
* @swagger
* /VaccineCenter/{id}:
*  delete:
*   summary: Deletes a VaccineCenter
*   tags: [VaccineCenter]
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
*       description: Deletes a VaccineCenter
*       content:
*         application/json:
*           schema:
*             type: array
*             items:
*               $ref: '#/components/schemas/VaccineCenter'
*
*/
router.delete('/:id', async (req, res) => {
  const filter = {
      _id: req.params.id,
  };

  VaccineCenter.findOneAndDelete(filter, (err, docs) => {
      if (err) {
          return res.status(500).json({
              message: `${err}`,
          });
      }
      if (!docs) return res.status(404).json({ message: "VaccineCenter not found" })
      return res.status(204).json({
          message: 'Deleted VaccineCenter with success',
      });
  });
});
module.exports = router;