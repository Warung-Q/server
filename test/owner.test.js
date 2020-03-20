const request = require('supertest')
const app  = require('../app')
const Sequelize = require('sequelize')
const { Owner, sequelize } = require('../models')
const { queryInterface } = sequelize


describe("Owner Register", () => {
    afterAll(done => {
        queryInterface.bulkDelete('Owners', {})
            .then(data => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })


    describe("owner register success", () => {
        test("should return status 201", done => {
            request(app)
            .post("/owner/register")
            .send({
                username: "Dimas",
                email: "dimas@mail.com",
                password: "dimas123"
            })
            .end((err, response) => {
                expect(err).toBe(null);
                expect(response.body).toHaveProperty("username", expect.any(String));
                expect(response.body).toHaveProperty("email", expect.any(String));
                expect(response.body).toHaveProperty("password", expect.any(String));
                expect(response.status).toBe(201);
                done()
            })
        })
    })

    describe("owner register failed invalid username", () => {
        test("should return status 400", done => {
            request(app)
            .post("/owner/register")
            .send({
                username: "",
                email: "dimas@mail.com",
                password: "dimas123"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', ["username cannot be empty"])
                expect(response.status).toBe(400)
                done()
            })
        })
    })

    describe("owner register failed invalid email", () => {
        test("should return status 400", done => {
            request(app)
            .post("/owner/register")
            .send({
                username: "dimas",
                email: "dimasmailcom",
                password: "dimas123"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', ["invalid email address format"])
                expect(response.status).toBe(400)
                done()
            })
        })
    })

    describe("owner register failed invalid password", () => {
        test("should return status 400", done => {
            request(app)
            .post("/owner/register")
            .send({
                username: "dimas",
                email: "dimas@mail.com",
                password: "di"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('errors', ["password must be at least 6 characters"])
                expect(response.status).toBe(400)
                done()
            })
        })
    })
})

describe('Owner Login', () => {
    let emailTemp
    beforeAll(done => {
        Owner.create({
            username: "yufi",
            email: "yufi@mail.com",
            password: "yufi123"
        })
            .then(result => {
                emailTemp = result.email
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    afterAll(done => {
        queryInterface.bulkDelete('Owners', {})
            .then(data => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe('login success', () => {
        test("should return status 200", done => {
            request(app)
            .post('/owner/login')
            .send({
                email: "yufi@mail.com",
                password: "yufi123"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('email', expect.any(String))
                expect(response.body).toHaveProperty('access_token', expect.any(String))
                expect(response.status).toBe(200)
                done()
            })
        })
    })

    describe('login failed', () => {
        test("should return status 400 with message invalid email/password", done => {
            request(app)
            .post('/owner/login')
            .send({
                email: "yufi8273@mail.com",
                password: "yufi123"
            })
            .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('err', "login failed")
                expect(response.body).toHaveProperty('errors', "invalid email or password")
                expect(response.status).toBe(404)
                done()
            })
        })
    })
})