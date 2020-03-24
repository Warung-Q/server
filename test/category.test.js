const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { Owner, Warung, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const private_key = process.env.PRIVATEKEY

let access_token
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
        email = result.email
        return Warung.create({
          name: 'warung sepatan',
          OwnerId: idOwnerTemp
        })
      })
      .then(data => {
        idWarungTemp = data.id
        let payload = {
          id: idOwnerTemp,
          email,
          WarungId: data.id
        }
        access_token = jwt.sign(
          {
            payload
          },
          private_key
        )
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
        .get('/categories')
        .set('access_token', access_token)
        .end((err, response) => {
          expect(err).toBe(null)
          console.log(response.body)
          expect(response).toHaveProperty('body', expect.any(Array))
          expect(response.status).toBe(200)
          done()
        })
    })
  })
})
