const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { expect } = chai;

const app = require('../index');

describe('center Crud', () => {
  let id;
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
  it('GET ALL center - Success', (done) => {
    request(app)
      .get('/centers/all')
      .set('content-type', 'application/json')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      })
      .then(() => done());
  });
  it('POST center - Success', async () => {
    const res = await request(app)
      .post('/centers')
      .set('content-type', 'application/json')
      .send({
        name: 'center name',
        address: 'center address',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.be.a('object');
    id = res.body._id;
  });
  it('GET BY ID center - Success', async () => {
    const res = await request(app)
      .get(`/centers/${id}`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('object');
  });
  it('GET BY ID center - Wrong ID', async () => {
    const res = await request(app)
      .get(`/centers/719bb4e28d56354b3cf78961`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(404);
  });
  it('PUT center - Success', async () => {
    const res = await request(app)
      .put(`/centers/${id}`)
      .set('content-type', 'application/json')
      .send({
        name: 'center name',
        address: 'center address',
      });

    expect(res.status).to.equal(203);
    expect(res.body).to.be.a('object');
  });
  it('PUT center - Wrong ID', async () => {
    const res = await request(app)
      .put(`/centers/719bb4e28d56354b3cf78961`)
      .set('content-type', 'application/json')
      .send({
        name: 'center name',
        address: 'center address',
      });

    expect(res.status).to.equal(404);
  });
  it('DELETE BY ID center - Success', async () => {
    const res = await request(app)
      .delete(`/centers/${id}`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(201);
  });
  it('DELETE BY ID center - Wrong ID', async () => {
    const res = await request(app)
      .delete(`/centers/719bb4e28d56354b3cf78961`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(404);
  });
});
