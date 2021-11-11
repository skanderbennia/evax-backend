const chai = require("chai");
const request = require("supertest");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("../models/User")

dotenv.config()

const { expect } = chai

const app = require("../index");

describe("Authentication CRUD", () => {
    it("POST Register - Success", async () => {

        const res = await request(app)
            .post("/auth/register")
            .set("content-type", "application/json")
            .send({
                name: "Jane Doe",
                email: "janedoe@gmail.com",
                address: "Khaznadar, Bardo",
                phone: "5555555555",
                password: "123456789",
                registry_mode: true,
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");
        id = res.body.data._id


    });
    it("POST Register - Existant Email", async () => {

        const res = await request(app)
            .post("/auth/register")
            .set("content-type", "application/json")
            .send({
                name: "Jane Doe",
                email: "janedoe@gmail.com",
                address: "Khaznadar, Bardo",
                phone: "5555555555",
                password: "123456789",
                registry_mode: true,
            })

        expect(res.status).to.equal(400);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.equal("Email already exists")


    });
    it("POST Login - Success", async () => {

        const res = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({
                email: "janedoe@gmail.com",
                password: "123456789"
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("token")
        expect(res.body).to.have.property("userInformation")
        expect(res.body.userInformation).to.be.a("object")
        expect(res.body.token).to.be.a("string")



    });
    it("POST Login - Wrong Email", async () => {

        const res = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({
                email: "janedoe@gmail.comm",
                password: "123456789"
            })

        expect(res.status).to.equal(400);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.equal("Email or password are wrong");



    });
    it("POST Login - Wrong Passowrd ", async () => {

        const res = await request(app)
            .post("/auth/login")
            .set("content-type", "application/json")
            .send({
                email: "janedoe@gmail.com",
                password: "12345678"
            })

        expect(res.status).to.equal(400);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.be.equal("Email or password are wrong");



    });
    after((done) => {
        User.findByIdAndDelete(id).then(() => done())
    })
})