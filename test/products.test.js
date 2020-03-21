const request = require('supertest')
const app = require('../app')
const { Manager, sequelize, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
let access_token, access_token_2

describe('Product test route', () => {
  beforeAll(done => {
    const managers = [
      {
        username: 'fakhran',
        email: 'fakhran@mail.com',
        password: 'fakhran123'
      },
      {
        username: 'user',
        email: 'yufi@mail.com',
        password: '123456'
      }
    ]

    Manager.bulkCreate(managers)
      .then(result => {
        const payload1 = { id: result[0].id, WarungId: 1 }
        const payload2 = { id: result[1].id, WarungId: 2 }
        access_token = jwt.sign(payload1, process.env.PRIVATEKEY)
        access_token_2 = jwt.sign(payload2, process.env.PRIVATEKEY)
        console.log(access_token, ' dari before all')
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
      .bulkDelete('Managers', {})
      .then(result => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('Test for product create', () => {
    describe('Case Add Product Success', () => {
      test('It should return data new product with status 201', done => {
        request(app)
          .post('/products')
          .set('token', access_token)
          .send({
            name: 'sunlight',
            price: 5000,
            stock: 15,
            expired_date: new Date(),
            barcode: '123891312',
            CategoryId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            console.log(response.body, 'ini responese')
            expect(response.body).toHaveProperty('product', expect.any(Object))
            expect(response.body.product).toHaveProperty('name', 'sunlight')
            expect(response.body.product).toHaveProperty('price', 5000)
            expect(response.body.product).toHaveProperty('stock', 15)
            expect(response.body.product).toHaveProperty('WarungId', 1)
            expect(response.body.product).toHaveProperty('barcode', '123891312')
            expect(response.body.product).toHaveProperty('CategoryId', 1)
            expect(response.body).toHaveProperty(
              'msg',
              'success insert new product'
            )
            expect(response.status).toBe(201)
            done()
          })
      })
    })
    describe('Case Add Product Fail', () => {
      describe('fail in product name', () => {
        test('product name null', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: null,
              price: 5000,
              stock: 15,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(String))
              expect(response.body).toHaveProperty('errors', [
                'product name cannot be null'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('product name empty', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: '',
              price: 5000,
              stock: 15,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', expect.any(String))
              expect(response.body).toHaveProperty('errors', [
                'product name cannot be empty'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('fail in price', () => {
        test('price null', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: null,
              stock: 15,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg')
              expect(response.body).toHaveProperty('errors', [
                'price cannot be null'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('price empty', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: '',
              stock: 15,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'price cannot be empty'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('price negative', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: -10000,
              stock: 15,
              barocode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'price cannot be negative'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('fail in stock', () => {
        test('stock null', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: 5000,
              stock: null,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'stock cannot be null'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('stock empty', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: 5000,
              stock: '',
              barocode: '123891312',
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'stock cannot be empty'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('stock negative', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: 10000,
              stock: -15,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: 1
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

      describe('fail in barcode', () => {
        test('barcode null', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: 5000,
              stock: 15,
              expired_date: new Date(),
              barcode: null,
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'barcode cannot be null'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('barcode empty', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: 5000,
              stock: 15,
              expired_date: new Date(),
              barcode: '',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'barcode cannot be empty'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('fail in category', () => {
        test('category null', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: 5000,
              stock: 15,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: null
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'category cannot be null'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })

        test('category empty', done => {
          request(app)
            .post('/products')
            .set('token', access_token)
            .send({
              name: 'sunlight',
              price: 5000,
              stock: 15,
              expired_date: new Date(),
              barcode: '123891312',
              CategoryId: ''
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'category cannot be empty'
              ])
              expect(response.status).toBe(400)
              done()
            })
        })
      })
    })
  })

  describe('Test for product update', () => {
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
    describe('Case Update Product Success', () => {
      test(' (Put) it should return msg success with status 1', done => {
        request(app)
          .put(`/products/${id}`)
          .set('token', access_token)
          .send({
            name: 'sunlight merah',
            price: 5000,
            stock: 15,
            expired_date: new Date(),
            barcode: '123891312',
            WarungId: 1,
            CategoryId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('status', [1])
            expect(response.body).toHaveProperty(
              'msg',
              'success update product'
            )
            expect(response.status).toBe(201)
            done()
          })
      })

      test(' (Patch) it should return msg success with status 1', done => {
        request(app)
          .patch(`/products/${id}`)
          .set('token', access_token)
          .send({
            stock: 15
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('status', [1])
            expect(response.body).toHaveProperty(
              'msg',
              'success update product'
            )
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('Case Update Product failed', () => {
      test('(put) fail in wrong product id', done => {
        request(app)
          .put(`/products/${id + 100}`)
          .set('token', access_token)
          .send({
            name: 'sunlight merah',
            price: 5000,
            stock: 15,
            expired_date: new Date(),
            barcode: '123891312',
            WarungId: 1,
            CategoryId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            console.log(response.body, id, 'ini body')
            expect(response.body).toHaveProperty('status', [0])
            expect(response.body).toHaveProperty('msg', 'failed update product')
            expect(response.status).toBe(201)
            done()
          })
      })

      test('(patch) fail in wrong product id', done => {
        request(app)
          .patch(`/products/${id + 100}`)
          .set('token', access_token)
          .send({
            stock: 15
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('status', [0])
            expect(response.body).toHaveProperty('msg', 'failed update product')
            expect(response.status).toBe(201)
            done()
          })
      })

      test('not login/ invalid token', done => {
        request(app)
          .put(`/products/${id}`)
          .set('token', 'empty_token')
          .send({
            name: 'sunlight',
            price: 7000,
            stock: 15,
            barocode: '123891312',
            CategoryId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('msg', 'Forbidden')
            expect(response.body).toHaveProperty(
              'errors',
              'You must login first'
            )
            expect(response.status).toBe(403)
            done()
          })
      })
    })
  })

  describe('Test for delete product', () => {
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

    describe('case success delete products', () => {
      test('it should return status 1 with success msg', done => {
        request(app)
          .delete(`/products/${id}`)
          .set('token', access_token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('status', 1)
            expect(response.body).toHaveProperty(
              'msg',
              'success delete product'
            )
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('case failed delete products', () => {
      test('wrong product id', done => {
        request(app)
          .delete(`/products/${id + 1}`)
          .set('token', access_token)
          .end((err, response) => {
            expect(err).toBe(null)
            console.log(response.body, 'body')
            expect(response.body).toHaveProperty('msg', 'NOT FOUND')
            expect(response.body).toHaveProperty('errors', 'DATA NOT FOUND')
            expect(response.status).toBe(404)
            done()
          })
      })
    })

    test('not authorized', done => {
      request(app)
        .delete(`/products/${id}`)
        .set('token', another_token)
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('msg', 'Bad Request')
          expect(response.body).toHaveProperty(
            'errors',
            'You are not authorized'
          )
          expect(response.status).toBe(401)
          done()
        })
    })
  })

  describe('Test for findOne product', () => {
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
    describe('success find one', () => {
      test('it should return a product', done => {
        request(app)
          .get(`/products/${id}`)
          .set('token', access_token)
          .end((err, response) => {
            expect(err).toBe(null)
            console.log(response.body, id)
            expect(response.body).toHaveProperty('name', expect.any(String))
            expect(response.body).toHaveProperty('price', expect.any(Number))
            expect(response.body).toHaveProperty('stock', expect.any(Number))
            expect(response.body).toHaveProperty('barcode', expect.any(String))
            expect(response.body).toHaveProperty(
              'CategoryId',
              expect.any(Number)
            )
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('fail find one', () => {
      test('not login/ invalid token', done => {
        request(app)
          .get(`/products/${id}`)
          .set('token', 'access_token')
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('msg', 'Forbidden')
            expect(response.body).toHaveProperty(
              'errors',
              'You must login first'
            )
            expect(response.status).toBe(403)
            done()
          })
      })
    })
  })

  describe('Test for findAll product', () => {
    describe('success find all', () => {
      test('it should return arrary of products', done => {
        request(app)
          .get(`/products`)
          .set('token', access_token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('products', expect.any(Array))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('fail find all', () => {
      test('not login/ invalid token', done => {
        request(app)
          .get(`/products/${id}`)
          .set('token', 'access_token')
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('msg', 'Forbidden')
            expect(response.body).toHaveProperty(
              'errors',
              'You must login first'
            )
            expect(response.status).toBe(403)
            done()
          })
      })
    })
  })
})
