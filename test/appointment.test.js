const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { expect } = chai;

const app = require('../index');

describe('Appointment Crud', () => {
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
  it('GENERATE Appointement - Success', async () => {
    const res = await request(app)
      .post('/appointments/center')
      .set('content-type', 'application/json')
      .send({
        center_id: '61c0651d8a4a6dbe765ecc96',
        date_debut: '2021-12-22',
        date_fin: '2021-12-24',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.have.property('message');
  });
  it('GENERATE Appointement  - Error - Missing Data ', () => {
    request(app)
      .post('/appointments/center')
      .set('content-type', 'application/json')
      .send({
        center_id: '61c0651d8a4a6dbe765ecc96',
        date_fin: '2021-12-24',
      })
      .then((res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });
  it('BOOK Appointement - Success', async () => {
    request(app)
      .post('/appointments/book')
      .set('content-type', 'application/json')
      .send({
        center_id: '61c0651d8a4a6dbe765ecc96',
        date_suggestion: '2021-12-22',
        user_id: '61c43f9b06fdbbe91b55c3b2',
      })
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.have.property('data');
        expect(res.body.data).to.be.a('object');
      });
  });
  it('BOOK Appointement - Error- Missing Data', async () => {
    request(app)
      .post('/appointments/book')
      .set('content-type', 'application/json')
      .send({
        date_suggestion: '2021-12-22',
        user_id: '61c43f9b06fdbbe91b55c3b2',
      })
      .then((res) => {
        expect(res.status).to.equal(500);
      });
  });
});
