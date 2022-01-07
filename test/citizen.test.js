const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { expect } = chai;

const app = require('../index');

describe('Citizen Crud', () => {
  const id = '61d045db3e56df0fcec48473';
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
  it('GET ALL Citizen - Success', (done) => {
    request(app)
      .get('/citizen/all')
      .set('content-type', 'application/json')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      })
      .then(() => done());
  });

  it('GET BY ID citizen - Success', async () => {
    const res = await request(app)
      .get(`/citizen/${id}`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('object');
  });
  it('GET BY ID citizen - Wrong ID', async () => {
    const res = await request(app)
      .get(`/citizen/6196766de77ad99802d56d94`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(404);
  });
  it('PUT citizen - Success', async () => {
    const res = await request(app)
      .put(`/citizen/${id}`)
      .set('content-type', 'application/json')
      .send({
        name: 'citizen name',
      });

    expect(res.status).to.equal(203);
    expect(res.body).to.be.a('object');
  });
  it('PUT citizen - Wrong ID', (done) => {
    request(app)
      .put(`/citizen/6196766de77ad99802d56d94`)
      .set('content-type', 'application/json')
      .send({
        name: 'citizen name',
      })
      .then((res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.a('object');
      })
      .then()
      .catch(done);
    done();
  });
});
