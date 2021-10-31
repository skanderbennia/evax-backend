const mongoose = require('mongoose');
const express = require('express');

const app = express();
const { port } = process.env;

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

app.listen(port, () => {
  console.log(`the server is listening on port ${port}`);
});
