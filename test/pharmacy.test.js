const chai = require("chai");
const request = require("supertest");
const mongoose = require("mongoose")
const dotenv = require("dotenv")


dotenv.config()

const { expect } = chai

const app = require("../index");

describe("Pharmacy Crud", () => {

    let id
    before((done) => {
        const DB = process.env.DATABASE;
        mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, done);
    })
    it("GET ALL pharmacy - Success", (done) => {

        request(app)
            .get("/pharmacy/all")
            .set("content-type", "application/json").then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a("array");

            }).then(done)

    });
    it("POST pharmacy - Success", async () => {

        const res = await request(app)
            .post("/pharmacy")
            .set("content-type", "application/json")
            .send({
                name: "pharmacy name",
                address: "pharmacy address",
                owner: "pharmacy owner"
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");
        id = res.body._id

    });
    it("GET BY ID pharmacy - Success", async () => {

        const res = await request(app)
            .get(`/pharmacy/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("object");

    });
    it("GET BY ID pharmacy - Wrong ID", async () => {

        const res = await request(app)
            .get(`/pharmacy/618ba7e28d56354b3cf89211`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(404);


    });
    it("PUT pharmacy - Success", async () => {

        const res = await request(app)
            .put(`/pharmacy/${id}`)
            .set("content-type", "application/json")
            .send({
                name: "pharmacy name",
                address: "pharmacy address",
                owner: "pharmacy owner"
            })

        expect(res.status).to.equal(203);
        expect(res.body).to.be.a("object");

    });
    it("PUT pharmacy - Wrong ID", async () => {

        const res = await request(app)
            .put(`/pharmacy/618ba7e28d56354b3cf89211`)
            .set("content-type", "application/json")
            .send({
                name: "pharmacy name",
                address: "pharmacy address",
                owner: "pharmacy owner"
            })

        expect(res.status).to.equal(404);
        expect(res.body).to.be.a("object");

    });
    it("DELETE BY ID pharmacy - Success", async () => {

        const res = await request(app)
            .delete(`/pharmacy/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(204);

    });
    it("DELETE BY ID pharmacy - Wrong ID", async () => {

        const res = await request(app)
            .delete(`/pharmacy/618ba7e28d56354b3cf89211`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(404);

    });
})