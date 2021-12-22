const chai = require("chai");
const request = require("supertest");
const mongoose = require("mongoose")
const dotenv = require("dotenv")


dotenv.config()

const { expect } = chai

const app = require("../index");

describe("Vaccine Crud", () => {

    let id
    before((done) => {
        const DB = process.env.DATABASE;
        mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => done());
    })
    it("GET ALL vaccine - Success", (done) => {

        request(app)
            .get("/vaccine/all")
            .set("content-type", "application/json").then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a("array");

            }).then(() => done())

    });
    it("POST vaccine - Success", async () => {

        const res = await request(app)
            .post("/vaccine")
            .set("content-type", "application/json")
            .send({
                label: "vaccine label"
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");
        id = res.body._id

    });
    it("GET BY ID vaccine - Success", async () => {

        const res = await request(app)
            .get(`/vaccine/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("object");

    });
    it("GET BY ID vaccine - Wrong ID", async () => {

        const res = await request(app)
            .get(`/vaccine/6196766de77ad99802d56d94`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(404);


    });
    it("PUT vaccine - Success", async () => {

        const res = await request(app)
            .put(`/vaccine/${id}`)
            .set("content-type", "application/json")
            .send({
                label: "vaccine label"
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");

    });
    it("PUT vaccine - Wrong ID", async () => {

        const res = await request(app)
            .put(`/vaccine/6196766de77ad99802d56d94`)
            .set("content-type", "application/json")
            .send({
                label: "vaccine label"
            })

        expect(res.status).to.equal(404);
        expect(res.body).to.be.a("object");

    });
    it("DELETE BY ID vaccine - Success", async () => {

        const res = await request(app)
            .delete(`/vaccine/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(204);

    });
    it("DELETE BY ID vaccine - Wrong ID", async () => {

        const res = await request(app)
            .delete(`/vaccine/6196766de77ad99802d56d94`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(404);

    });



})