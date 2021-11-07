const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - address
 *         - phone
 *         - registry_mode
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the instance (project)
 *         name:
 *           type: string
 *           description: The User name
 *         email:
 *           type: String
 *           description: The User email
 *         address:
 *           type: string
 *           description: The User address
 *         password:
 *           description: The User password
 *           type: string
 *         registry_mode:
 *           type: boolean
 *
 *       example:
 *         name: "Jane Doe"
 *         email: "janedoe@gmail.com"
 *         address: "Khaznadar, Bardo"
 *         phone: "5555555555"
 *         password: "123456789"
 *         registry_mode: true
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   summary: Creates a new User
 *   tags: [Authentication]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
 *
 *   responses:
 *     200:
 *       description: Creates a new User
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/User'
 *
 */
router.post('/register', async (req, res) => {
  const isEmailExist = await User.findOne({
    email: req.body.email,
  });
  console.log(req.body.email);
  console.log(isEmailExist);
  // throw error when email already registered
  if (isEmailExist)
    return res.status(400).json({
      error: 'Email already exists',
    });

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    registry_mode: req.body.registry_mode,
    password,
  });

  try {
    const savedUser = await user.save();
    res.json({
      error: null,
      data: {
        userId: savedUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

/**
 * @swagger
 * /auth/login:
 *  post:
 *   summary: Creates a new User
 *   tags: [Authentication]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
 *
 *   responses:
 *     200:
 *       description: Creates a new User
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/User'
 *
 */
router.post('/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  // throw error when email is wrong
  if (!user)
    return res.status(400).json({
      error: 'Email is wrong',
    });

  // check for password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      error: 'Password is wrong',
    });

  // create token
  const token = jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    process.env.TOKEN_SECRET
  );

  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
      user,
      message: 'user connected',
    },
  });
});

module.exports = router;
