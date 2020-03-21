const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { Owner, Warung, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const private_key = process.env.PRIVATEKEY

let access_token
let wrong_access_token = 'weofibergoi32hr983hr34'
let idOwnerTemp = 66
let idWarungTemp

describe('Warung test route', () => {
  beforeAll(done => {
    Owner.create({
      username: 'fakhran',
      email: 'fakhran@mail.com',
      password: 'fakhran123'
    })
      .then(result => {
        idOwnerTemp = result.id
        let payload = {
          id: result.id,
          email: result.email
        }
        access_token = jwt.sign(
          {
            payload
          },
          private_key
        )
        return Warung.create({
          name: 'warung sepatan',
          OwnerId: idOwnerTemp,
          ManagerId: 2
        })
      })
      .then(data => {
        idWarungTemp = data.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface
      .bulkDelete('Warungs', {})
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface
      .bulkDelete('Owners', {})
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('fetch all warung success', () => {
    test('it should return status 200', done => {
      request(app)
        .get('/warung')
        .set('access_token', access_token)
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response).toHaveProperty('body', expect.any(Array))
          expect(response.status).toBe(200)
          done()
        })
    })
  })

  describe('fetch all warung failed', () => {
    test('it should return status 404', done => {
      request(app)
        .get('/warung')
        .set('access_token', wrong_access_token)
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('err', 'NOT FOUND')
          expect(response.body).toHaveProperty('errors', 'DATA NOT FOUND')
          expect(response.status).toBe(404)
          done()
        })
    })
  })

  describe('create warung success', () => {
    test('it should return status 201', done => {
      request(app)
        .post('/warung/add')
        .set('access_token', access_token)
        .send({
          name: 'Warung Sepatan',
          OwnerId: idOwnerTemp,
          ManagerId: 2
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response).toHaveProperty('body', expect.any(Object))
          expect(response.status).toBe(201)
          done()
        })
    })
  })

  describe('create warung failed', () => {
    test('it should return status 400', done => {
      request(app)
        .post('/warung/add')
        .set('access_token', access_token)
        .send({
          name: '',
          OwnerId: idOwnerTemp,
          ManagerId: 2
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('errors', [
            'name cannot be empty'
          ])
          expect(response.status).toBe(400)
          done()
        })
    })
  })

  describe('find one warung success', () => {
    test('it should return status 200', done => {
      request(app)
        .get('/warung/edit/' + idWarungTemp)
        .set('access_token', access_token)
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response).toHaveProperty('body', expect.any(Object))
          expect(response.status).toBe(200)
          done()
        })
    })
  })

  describe('find one warung failed', () => {
    test('it should return status 404', done => {
      request(app)
        .get('/warung/edit/' + 93025)
        .set('access_token', access_token)
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('err', 'Data not Found')
          expect(response.status).toBe(404)
          done()
        })
    })
  })

  describe('update warung success', () => {
    test('it should return status 201', done => {
      request(app)
        .put('/warung/edit/' + idWarungTemp)
        .set('access_token', access_token)
        .send({
          name: 'Warung Hacktiv8',
          OwnerId: idOwnerTemp,
          ManagerId: 2
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty(
            'msg',
            'Warung updated successfully'
          )
          expect(response.status).toBe(201)
          done()
        })
    })
  })

  describe('update warung failed', () => {
    test('it should return status 400', done => {
      request(app)
        .put('/warung/edit/' + idWarungTemp)
        .set('access_token', access_token)
        .send({
          name: '',
          OwnerId: idOwnerTemp,
          ManagerId: 2
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('errors', [
            'name cannot be empty'
          ])
          expect(response.status).toBe(400)
          done()
        })
    })
  })

  describe('delete warung success', () => {
    test('it should return status 200', done => {
      request(app)
        .delete('/warung/delete/' + idWarungTemp)
        .set('access_token', access_token)
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty(
            'msg',
            'Warung deleted successfully'
          )
          expect(response.status).toBe(200)
          done()
        })
    })
  })

  // describe('delete warung failed', () => {
  //     test.only('it should return status 400', done => {
  //         request(app)
  //         .delete('/warung/delete/' + 98552)
  //         .set('access_token', access_token)
  //         .end((err, response) => {
  //             expect(err).toBe(null)
  //             console.log(response.body, "<<<<<<<<<<<<")
  //             expect(response.status).toBe(400)
  //             done()
  //         })
  //     })
  // })
})
