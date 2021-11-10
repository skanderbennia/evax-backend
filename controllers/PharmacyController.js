const router = require('express').Router();
const Pharmacy = require('../models/Pharmacy');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pharmacy:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - owner
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         name:
 *           type: string
 *           description: The Pharmacy name
 *         address:
 *           type: string
 *           description: The Pharmacy address
 *         owner:
 *           type: string
 *
 *       example:
 *         name: "Pharmacy Khaznadar"
 *         address: "Khaznadar Bardo"
 *         owner: "Monsef Marzoukii"
 */

/**
 * @swagger
 * /pharmacy/:
 *  post:
 *   summary: Creates a new Pharmacy
 *   tags: [Pharmacy]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Pharmacy'
 *
 *   responses:
 *     200:
 *       description: Creates a new Pharmacy
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Pharmacy'
 *
 */
router.post('/', (req, res) => {
    console.log(req.body);
    const new_pharmacy = new Pharmacy(req.body);

    new_pharmacy.save((err, doc) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log('Pharmacy added with success');
        return res.status(200).send(doc);
    });
});

/**
 * @swagger
 * /pharmacy/all:
 *   get:
 *     tags: [Pharmacy]
 *     description: Get all pharmacies
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/all', async (req, res) => {
    try {
        const pharmacies = await Pharmacy.find();
        res.json(pharmacies);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

/**
 * @swagger
 * /pharmacy/{id}:
 *  get:
 *    summary: Returns the list of pharmacy by id
 *    tags: [Pharmacy]
 *    parameters:
 *      - in : path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 
 *    responses:
 *      200:
 *        description: The list of pharmacy by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Pharmacy'
 *      404:
 *        description: no centers
 *
 */

router.get('/:id', async (req, res) => {
    try {
        const pharmacy = await Pharmacy.find({
            _id: req.params.id,
        });
        res.json(pharmacy);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

/**
 * @swagger
 * /pharmacy/{id}:
 *  put:
 *   summary: Updates pharmacy by id
 *   tags: [Pharmacy]
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
 *          $ref: '#/components/schemas/Pharmacy'
 *
 *   responses:
 *     200:
 *       description: Updates Pharmacy by id
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Pharmacy'
 *
 */
router.put('/:id', async (req, res) => {
    const filter = {
        _id: req.params.id,
    };
    const updateObject = req.body;

    try {
        await Pharmacy.findOneAndUpdate(filter, updateObject);
        res.status(500).json({
            message: 'Pharmacy updated with success',
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * @swagger
 * /pharmacy/{id}:
 *  delete:
 *   summary: Deletes a Pharmacy
 *   tags: [Pharmacy]
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
 *       description: Deletes a Pharmacy
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Pharmacy'
 *
 */
router.delete('/:id', async (req, res) => {
    const filter = {
        _id: req.params.id,
    };

    Pharmacy.findOneAndDelete(filter, (err, docs) => {
        if (err) {
            return res.status(500).json({
                message: `${err}`,
            });
        }
        return res.status(200).json({
            message: 'Deleted pharmacy with success',
        });
    });
});

module.exports = router;
