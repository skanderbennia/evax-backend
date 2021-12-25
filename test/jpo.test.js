const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { expect } = chai;

const app = require('../index');

describe('Jpo Crud', () => {
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
  it('GET ALL jpos - Success', (done) => {
    request(app)
      .get('/jpo/all')
      .set('content-type', 'application/json')
      .then((res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
      })
      .then(() => done());
  });
  it('POST jpo - Success', async () => {
    const res = await request(app)
      .post('/jpo')
      .set('content-type', 'application/json')
      .send({
        date: '25/12/2022',
        center_id: '61c0651d8a4a6dbe765ecc96',
        volunteers_id: [
          '618da2ff328d7b7827a7026d',
          '61b6a132189fa2786b81eee8',
          '61b6a2aa189fa2786b81eeea',
        ],
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.be.a('object');
    id = res.body._id;
  });
  it('GET BY ID jpo - Success', async () => {
    const res = await request(app)
      .get(`/jpo/${id}`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('object');
  });
  it('GET BY ID jpo - Wrong ID', async () => {
    const res = await request(app)
      .get(`/jpo/61c378a52b06aeba5593ed5c`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(404);
  });
  it('PUT jpo - Success', async () => {
    const res = await request(app)
      .put(`/jpo/${id}`)
      .set('content-type', 'application/json')
      .send({
        date: '23/12/2021',
        center_id: '61c0651d8a4a6dbe765ecc96',
        volunteers_id: [
          '618da2ff328d7b7827a7026d',
          '61b6a132189fa2786b81eee8',
          '61b6a2aa189fa2786b81eeea',
        ],
      });

    expect(res.status).to.equal(203);
    expect(res.body).to.be.a('object');
  });
  it('PUT jpo - Wrong ID', async () => {
    const res = await request(app)
      .put(`/jpo/61c378a52b06aeba5593ed5c`)
      .set('content-type', 'application/json')
      .send({
        date: '10/11/2022',
        center_id: '61c0651d8a4a6dbe765ecc96',
        volunteers_id: [
          '618da2ff328d7b7827a7026d',
          '61b6a132189fa2786b81eee8',
          '61b6a2aa189fa2786b81eeea',
        ],
      });

    expect(res.status).to.equal(404);
    expect(res.body).to.be.a('object');
  });
  it('DELETE BY ID volunteer - Success', async () => {
    const res = await request(app)
      .delete(`/jpo/${id}`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(204);
  });
  it('DELETE BY ID jpo - Wrong ID', async () => {
    const res = await request(app)
      .delete(`/jpo/618ba7e28d56354b3cf89211`)
      .set('content-type', 'application/json');

    expect(res.status).to.equal(404);
  });
});
