const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

const appointement_router = require('./appoitements_maker/appointement-generate');

dotenv.config();
const app = express();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// const DB = process.env.DATABASE_LOCAL

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection is successful');
  });
app.use(appointement_router);
const port = 3007;
app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});
