const chai = require("chai");
const request = require("supertest");
const mongoose = require("mongoose")
const dotenv = require("dotenv")


dotenv.config()

const { expect } = chai

const app = require("../index");

describe("Volunteer Crud", () => {

    let id
    before((done) => {
        const DB = process.env.DATABASE;
        mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => done());
    })
    it("GET ALL volunteers - Success", (done) => {

        request(app)
            .get("/volunteers/all")
            .set("content-type", "application/json").then((res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a("array");

            }).then(() => done())

    });
    it("POST volunteer - Success", async () => {

        const res = await request(app)
            .post("/volunteers")
            .set("content-type", "application/json")
            .send({
                firstName: "ahmed",
                lastName: "ahmed",
                age: 19,
                phoneNumber: "12345678",
                cin: "023165478",
                operator: true,
                volunteer_team: "Tunisian Scouts"
            })

        expect(res.status).to.equal(201);
        expect(res.body).to.be.a("object");
        id = res.body._id

    });
    it("GET BY ID volunteer - Success", async () => {

        const res = await request(app)
            .get(`/volunteers/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(200);
        expect(res.body).to.be.a("object");

    });
    it("GET BY ID volunteer - Wrong ID", async () => {

        const res = await request(app)
            .get(`/volunteers/618ba7e28d56354b3cf89213`)
            .set("content-type", "application/json")
            
        expect(res.status).to.equal(404);


    });
    it("PUT volunteer - Success", async () => {

        const res = await request(app)
            .put(`/volunteers/${id}`)
            .set("content-type", "application/json")
            .send({
                firstName: "ahmed",
                lastName: "ahmed",
                age: 19,
                phoneNumber: "12345678",
                cin: "023165478",
                operator: true,
                volunteer_team: "Tunisian Scouts"
            })

        expect(res.status).to.equal(203);
        expect(res.body).to.be.a("object");

    });
    it("PUT volunteer - Wrong ID", async () => {

        const res = await request(app)
            .put(`/volunteers/618ba7e28d56354b3cf89211`)
            .set("content-type", "application/json")
            .send({
                firstName: "ahmed",
                lastName: "ahmed",
                age: 19,
                phoneNumber: "12345678",
                cin: "023165478",
                operator: true,
                volunteer_team: "Tunisian Scouts"
            })

        expect(res.status).to.equal(404);
        expect(res.body).to.be.a("object");

    });
    it("DELETE BY ID volunteer - Success", async () => {

        const res = await request(app)
            .delete(`/volunteers/${id}`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(204);

    });
    it("DELETE BY ID volunteer - Wrong ID", async () => {

        const res = await request(app)
            .delete(`/volunteers/618ba7e28d56354b3cf89211`)
            .set("content-type", "application/json")

        expect(res.status).to.equal(404);

    });
})