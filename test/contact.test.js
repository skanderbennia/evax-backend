const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { expect } = chai;

const app = require('../index');

describe('Contact Crud', () => {
  before((done) => {
    const DB = process.env.DATABASE;
    mongoose.connect(
      DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => done()
    );
  });
  it('Send email to contact - Success', (done) => {
    request(app)
      .post('/contact/')
      .set('content-type', 'application/json')
      .send({
        email: 'evaxdelatunisie@gmail.com',
        message: 'just testing ',
      })
      .then((res) => {
        expect(res.status).to.equal(200);
      });
    done();
  });
});
