const chai = require("chai");
const request = require("supertest");
const mongoose = require("mongoose")
const dotenv = require("dotenv")


dotenv.config()

const { expect } = chai

const app = require("../index");

describe("VaccineCenter Crud", () => {

    let id
    before((done) => {
        const DB = process.env.DATABASE;
        mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => done());
    })
    it("GET ALL vaccineCenter - Success", (done) => {

        request(app)
            .get("/VaccineCenter/all")
            .set("content-type", "application/json").then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a("array");

            }).then(() => done())

    });
    it("POST vaccineCenter - Success", async () => {

        const res = await request(app)
            .post("/VaccineCenter")
            .set("content-type", "application/json")
            .send({
                quantity: 50,
                vaccine_id: "61c1f91f212ef4299e572c11",
                center_id: "61c0651d8a4a6dbe765ecc96"
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");
        id = res.body._id

    });
    it("GET BY ID vaccineCenter - Success", async () => {

        const res = await request(app)
            .get(`/VaccineCenter/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("object");

    });
    it("GET BY ID vaccineCenter - Wrong ID", async () => {

        const res = await request(app)
            .get(`/VaccineCenter/6196766de77ad99802d56d94`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(404);


    });
    it("PUT vaccineCenter - Success", async () => {

        const res = await request(app)
            .put(`/VaccineCenter/${id}`)
            .set("content-type", "application/json")
            .send({
                quantity: 60,
                vaccine_id: "61c1f91f212ef4299e572c11",
                center_id: "61c0651d8a4a6dbe765ecc96"
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");

    });
    it("PUT vaccineCenter - Wrong ID", async () => {

        const res = await request(app)
            .put(`/VaccineCenter/6196766de77ad99802d56d94`)
            .set("content-type", "application/json")
            .send({
                quantity: 60,
                vaccine_id: "61c1f91f212ef4299e572c11",
                center_id: "61c0651d8a4a6dbe765ecc96"
            })

        expect(res.status).to.equal(404);
        expect(res.body).to.be.a("object");

    });
    it("DELETE BY ID vaccineCenter - Success", async () => {

        const res = await request(app)
            .delete(`/VaccineCenter/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(204);

    });
    it("DELETE BY ID vaccineCenter - Wrong ID", async () => {

        const res = await request(app)
            .delete(`/VaccineCenter/6196766de77ad99802d56d94`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(404);

    });
})