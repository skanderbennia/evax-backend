const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { expect } = chai;

const app = require('../index');

describe('Operator Crud', () => {
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
  it('GET ALL operator - Success', (done) => {
    request(app)
      .get('/operator/all')
      .set('content-type', 'application/json')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      })
      .then(() => done());
  });
  it('POST operator - Success', async () => {
    const res = await request(app)
      .post('/operator')
      .set('content-type', 'application/json')
      .send({
        name: 'operator name',
        email: 'operator@gmail.com',
        password: 'operator password',
        tel: 'operator tel',
        cin: 'operator cin',
        phone: '12345678',
        role: 'operator',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('object');
    id = res.body.operator._id;
  });
  it('GET BY ID operator - Success', async () => {
    const res = await request(app)
      .get(`/operator/${id}`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('object');
  });
  it('GET BY ID operator - Wrong ID', async () => {
    const res = await request(app)
      .get(`/operator/6196766de77ad99802d56d94`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(404);
  });
  it('PUT operator - Success', async () => {
    const res = await request(app)
      .put(`/operator/${id}`)
      .set('content-type', 'application/json')
      .send({
        name: 'operator name',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.be.a('object');
  });
  it('PUT operator - Wrong ID', async () => {
    const res = await request(app)
      .put(`/operator/6196766de77ad99802d56d94`)
      .set('content-type', 'application/json')
      .send({
        name: 'operator name',
        password: 'operator password',
        tel: 'operator tel',
        cin: 'operator cin',
      });

    expect(res.status).to.equal(404);
    expect(res.body).to.be.a('object');
  });
  it('DELETE BY ID operator - Success', async () => {
    const res = await request(app)
      .delete(`/operator/${id}`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(204);
  });
  it('DELETE BY ID operator - Wrong ID', async () => {
    const res = await request(app)
      .delete(`/operator/6196766de77ad99802d56d94`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(404);
  });
});
