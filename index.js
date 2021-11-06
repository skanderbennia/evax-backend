const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
// Documentation
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
// Models
const User = require('./models/User');
// Controllers
const appointment_router = require('./appoitments_maker/appointment-generate');
const centerConroller = require('./controllers/centerController');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Evax-react management API',
      version: '1.0.0',
      description: `<i>Group of endpoints that manage the CRUD operations for Evax-react</i>`,
      contact: {},
      servers: ['http://localhost:4000/'],
    },
  },
  apis: [
    `${__dirname}/appoitments_maker/appointment-generate.js`,
    `${__dirname}/controllers/**.js`,
  ],
};

const swaggerDocs = swaggerJSDOC(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Database connection
const DB = process.env.DATABASE;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database ------'));

// Routes
app.use('/appointments', appointment_router);
app.use('/centers', centerConroller);

// Server
const port = 4000 || process.env.port;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/* app.get('/', async (req, res) => {
  const user = await User.create({
    name: 'skander',
  });
  user.save();
  res.send('done!');
});
*/
