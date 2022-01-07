const chai = require('chai');
const request = require('supertest');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const { expect } = chai;

const app = require('../index');

let id;
describe('Authentication CRUD', () => {
  it('POST Register - Success', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('content-type', 'application/json')
      .send({
        name: 'Jane Doe',
        email: 'ghada.bendhieb20@gmail.com',
        address: 'Khaznadar, Bardo',
        phone: '5555555555',
        registry_mode: true,
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.be.a('object');
  });
  it('POST Register - Existant Email', async () => {
    const res = await request(app)
      .post('/auth/register')
      .set('content-type', 'application/json')
      .send({
        name: 'Jane Doe',
        email: 'ghada.bendhieb20@gmail.com',
        address: 'Khaznadar, Bardo',
        phone: '5555555555',
        password: '123456789',
        registry_mode: true,
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.be.equal('Email already exists');
  });
  it('POST Login Step 1 - Success', async () => {
    const res = await request(app)
      .post('/auth/login-step-1')
      .set('content-type', 'application/json')
      .send({
        email: 'ghada.bendhieb20@gmail.com',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('POST Login Step 1 - Wrong Email', async () => {
    const res = await request(app)
      .post('/auth/login-step-1')
      .set('content-type', 'application/json')
      .send({
        email: 'janedoe@gmail.comm',
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  it('POST Login Step 2 - Success', async () => {
    const res = await request(app)
      .post('/auth/login-step-2')
      .set('content-type', 'application/json')
      .send({
        email: 'ghada.bendhieb20@gmail.com',
        password: 'Hktm92',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('userInformation');
    expect(res.body.userInformation).to.be.a('object');
    expect(res.body.token).to.be.a('string');
    id = res.body.userInformation._id;
  });

  it('POST Login - Wrong Passowrd ', async () => {
    const res = await request(app)
      .post('/auth/login-step-2')
      .set('content-type', 'application/json')
      .send({
        email: 'ghada.bendhieb20@gmail.com',
        password: 'Hktm9',
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.be.a('object');
    expect(res.body).to.have.property('message');
  });
  after((done) => {
    User.findByIdAndDelete(id).then(() => done());
  });
});
