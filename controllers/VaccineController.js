const router = require('express').Router();
const Vaccine = require('../models/Vaccine');

/**
 * @swagger
 * components:
 *   schemas:
 *     Vaccine:
 *       type: object
 *       required:
 *         - label
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         label:
 *           type: number
 *           description: The label 
 *       example:
 *         label: "pfizer"
 */
/**
 * @swagger
 * /vaccine/:
 *  post:
 *   summary: Creates a new Vaccine
 *   tags: [Vaccine]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Operator'
 *
 *   responses:
 *     200:
 *       description: Creates a new Vaccine
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Vaccine'
 *
 */
 router.post('/', (req, res) => {
    
    const new_vaccine = new Vaccine(req.body);

    new_vaccine.save((err, doc) => {
        if (err) {
            return res.status(500).send(err);
        }
      
        return res.status(201).send(doc);
    });
});
/**
 * @swagger
 * /vaccine/all:
 *   get:
 *     tags: [Vaccine]
 *     description: Get all vaccines
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/all', async (req, res) => {
    try {
        const vaccines = await Vaccine.find();
        res.json(vaccines);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
/**
 * @swagger
 * /vaccine/{id}:
 *  get:
 *    summary: Returns the list of vaccine by id
 *    tags: [Vaccine]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      200:
 *        description: The list of vaccine by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Vaccine'
 *      404:
 *        description: no vaccines
 *
 */

 router.get('/:id', async (req, res) => {
    try {
        const vaccine = await Vaccine.findById(req.params.id);
        if(!vaccine){
            return res.status(404).json({message:"vaccine not found"})
        }
        res.status(200).json(vaccine);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

/**
 * @swagger
 * /vaccine/{id}:
 *  put:
 *   summary: Updates vaccine by id
 *   tags: [Vaccine]
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
 *          $ref: '#/components/schemas/Vaccine'
 *
 *   responses:
 *     200:
 *       description: Updates Vaccine by id
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Vaccine'
 *
 */
router.put('/:id', async (req, res) => {
    const filter = {
        _id: req.params.id,
    };
    const updateObject = req.body;

    try {
         const updatedVaccine = await Vaccine.findOneAndUpdate(filter, updateObject);
        if(!updatedVaccine){
            return res.status(404).json({message:"vaccine no found"})
        }
        res.status(201).json({
            message: 'Vaccine updated with success',
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /vaccine/{id}:
 *  delete:
 *   summary: Deletes a Vaccine
 *   tags: [Vaccine]
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
 *       description: Deletes a Vaccine
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Vaccine'
 *
 */
router.delete('/:id', async (req, res) => {
    const filter = {
        _id: req.params.id,
    };

    Vaccine.findOneAndDelete(filter, (err, docs) => {
        if (err) {
            return res.status(500).json({
                message: `${err}`,
            });
        }
        if (!docs) return res.status(404).json({ message: "vaccine not found" })
        return res.status(204).json({
            message: 'Deleted vaccine with success',
        });
    });
});
module.exports = router;
