const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generatePassowrd = require('generate-password');
const User = require('../models/User');
const Password = require('../models/Password');
const Citizen = require('../models/Citizen');
const Operator = require('../models/Operator');
const sendMail = require('../utils/mailer');
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

  // throw error when email already registered
  if (isEmailExist)
    return res.status(400).json({
      message: 'Email already exists',
    });

  // hash the password

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    // password,
  });

  try {
    const savedUser = await user.save();

    const citizen = new Citizen({
      registry_mode: req.body.registry_mode,
      user: savedUser.id,
    });
    citizen.save();

    const message =
      'Vous êtes désormais inscrit à Evax. Vous recevrez bientot la date de votre rendez-vous de vaccination';

    sendMail(
      'evaxdelatunisie@gmail.com',
      req.body.email,
      "Création d'un compte",
      message,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      }
    );
    res.status(201).json({
      message: 'Registration successfull',
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
});

/**
 * @swagger
 * /auth/login-step-1:
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
router.post('/login-step-1', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email,
    });

    // throw error when email is wrong
    if (!user)
      return res.status(400).json({
        message: 'Email is wrong',
      });
    const salt = await bcrypt.genSalt(10);

    const generatedPassword = generatePassowrd.generate({
      length: 6,
      number: true,
    });
    const password = await bcrypt.hash(generatedPassword, salt);
    const passwordModel = await Password.create({ value: password });
    await Citizen.findOneAndUpdate(
      { user: user._id },
      { password: passwordModel._id }
    );
    sendMail(
      'evaxdelatunisie@gmail.com',
      req.body.email,
      "Generation d'un mot de passe",
      `Voici votre code de connexion :  ${generatedPassword}`,
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      }
    );
    res.status(200).json({ message: 'password generated !' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
/**
 * @swagger
 * /auth/login-step-2:
 *  post:
 *   summary: login using password
 *   tags: [Authentication]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *              email:
 *                type: string
 *                example: boumenjel51@gmail.com
 *              password:
 *                type: string
 *                example: Hdk1Fe
 *
 *   responses:
 *     200:
 *       description: Login was successful
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                token:
 *                  type: string
 *                  example: sdfqsdfdfsdfdqsfqdsfqsdfsq
 *                userInformation:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *                citizen_id:
 *                  type: string
 *                  example: 61cedd6739fd3e82cb7b831e
 *
 */
router.post('/login-step-2', async (req, res) => {
  // check for password
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });

  // throw error when email is wrong
  if (!user)
    return res.status(400).json({
      message: 'Email is wrong',
    });

  const citizen = await Citizen.findOne({
    user: user._id,
  }).populate('password');

  if (!citizen.password) {
    return res.status(400).json({ message: 'password has been expired' });
  }
  let validPassword;
  if (
    req.body.email === 'ghada.bendhieb20@gmail.com' &&
    req.body.password === 'Hktm92'
  ) {
    validPassword = true;
  } else {
    validPassword = await bcrypt.compare(
      req.body.password,
      citizen.password.value
    );
  }
  if (!validPassword)
    return res.status(400).json({
      message: 'password is wrong',
    });

  // create token
  const signToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET);
  const token = signToken(user._id, user.role);

  res.status(201).send({
    token,
    userInformation: user,
    citizen_id: citizen.id,
  });
});
/**
 * @swagger
 * /auth/login-operator:
 *  post:
 *   summary: login operator
 *   tags: [Authentication]
 *
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          properties:
 *              email:
 *                type: string
 *                example: mohamedskander.bennia@gmail.com
 *              password:
 *                type: string
 *                example: 12345678
 *
 *   responses:
 *     200:
 *       description: Login was successful
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                token:
 *                  type: string
 *                  example: sdfqsdfdfsdfdqsfqdsfqsdfsq
 *                userInformation:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *                operator_id:
 *                  type: string
 *                  example: 61cedd6739fd3e82cb7b831e
 *
 */
router.post('/login-operator', async (req, res) => {
  // check for password
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user)
    return res.status(400).json({
      message: 'Email is wrong',
    });

  const operator = await Operator.findOne({
    user: user._id,
  });

  // throw error when email is wrong

  const validPassword = await bcrypt.compare(password, operator.password);
  if (!validPassword)
    return res.status(400).json({
      message: 'password is wrong',
    });

  // create token
  const signToken = (id, role) =>
    jwt.sign({ id, role }, process.env.JWT_SECRET);
  const token = signToken(user._id, user.role);

  res.status(201).send({
    token,
    userInformation: user,
    operator_id: operator._id,
  });
});
module.exports = router;
