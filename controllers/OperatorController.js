const router = require('express').Router();
const Operator = require('../models/Operator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Operator:
 *       type: object
 *       required:
 *         - name
 *         - password
 *         - tel
 *         - cin
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         name:
 *           type: string
 *           description: The Operator name
 *         password:
 *           type: string
 *           description: The Operator password
 *         tel:
 *           type: string
 *           description: The Operator tel
 *         cin:
 *           type: string
 *           description: The Operator cin
 *
 *       example:
 *         name: "Ghada Ben Dhiab"
 *         password: "ghadaghada"
 *         tel: "29000000"
 *         cin: "44443333"
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
 *          $ref: '#/components/schemas/Operator'
 *
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
router.post('/', (req, res) => {
    console.log(req.body);
    const new_operator = new Operator(req.body);

    new_operator.save((err, doc) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log('Operator added with success');
        return res.status(200).send(doc);
    });
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
        const operators = await Operator.find();
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
        const operator = await Operator.find({
            _id: req.params.id,
        });
        res.json(operator);
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
 *          $ref: '#/components/schemas/Operator'
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
    const filter = {
        _id: req.params.id,
    };
    const updateObject = req.body;

    try {
        await Operator.findOneAndUpdate(filter, updateObject);
        res.status(500).json({
            message: 'Operator updated with success',
        });
    } catch (err) {
        res.status(500).send(err);
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
        return res.status(200).json({
            message: 'Deleted operator with success',
        });
    });
});

module.exports = router;
