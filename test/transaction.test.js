const request = require('supertest')
const app = require('../app')
const { Owner, Warung, sequelize, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
let access_token, email
let idOwnerTemp
const private_key = process.env.PRIVATEKEY

describe('Product test route', () => {
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
      .bulkDelete('Transactions', {})
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterEach(done => {
    queryInterface
      .bulkDelete('Products', {})
      .then(result => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll(done => {
    queryInterface
      .bulkDelete('Owners', {})
      .then(result => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('test add transaction', () => {
    let id
    beforeEach(done => {
      Product.create({
        name: 'sunlight',
        price: 5000,
        stock: 15,
        expired_date: new Date(),
        barcode: '123891312',
        WarungId: 1,
        CategoryId: 1
      })
        .then(result => {
          id = result.id
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    describe('test warung case success', () => {
      test('it should return status 201', done => {
        request(app)
          .post('/transaction')
          .set('access_token', access_token)
          .send({
            carts: [
              {
                ProductId: id,
                quantity: 10,
                total_price: 10000
              }
            ]
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response).toHaveProperty('body', expect.any(Object))
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('test warung case failse', () => {
      test('it should return status 201', done => {
        request(app)
          .post('/transaction')
          .set('access_token', access_token)
          .send({
            carts: [
              {
                ProductId: id,
                quantity: 100,
                total_price: 10000
              }
            ]
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('msg', 'Bad Request')
            expect(response.body).toHaveProperty('errors', [
              'stock cannot be negative'
            ])
            expect(response.status).toBe(400)
            done()
          })
      })
    })

    describe('success find all', () => {
      test('it should return arrary of products', done => {
        request(app)
          .get(`/transaction`)
          .set('access_token', access_token)
          .end((err, response) => {
            expect(err).toBe(null)
            console.log(response.body)
            expect(response).toHaveProperty('body', expect.any(Object))
            expect(response.status).toBe(200)
            done()
          })
      })
    })
  })
})
