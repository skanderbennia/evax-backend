const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const User = require('./models/User');

const appointement_router = require('./appoitements_maker/appointement-generate');

dotenv.config();
const app = express();

const DB = process.env.DATABASE;
console.log(DB);
// const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database ------'));
app.use(appointement_router);
const port = 3007;
app.get('/', async (req, res) => {
  const user = await User.create({
    name: 'skander',
  });
  user.save();
  res.send('done!');
});
app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});
