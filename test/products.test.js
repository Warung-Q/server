const request = require('supertest')
const app = require('../app')

describe('Product test route', () => {
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
            barocode: '123891312',
            CategoryId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('data', expect.any(Object))
            expext(response.body.data).toHaveProperty('name', 'sunlight')
            expext(response.body.data).toHaveProperty('price', 5000)
            expext(response.body.data).toHaveProperty('stock', 15)
            expext(response.body.data).toHaveProperty('WarungId', 1)
            expext(response.body.data).toHaveProperty('barcode', '123891312')
            expext(response.body.data).toHaveProperty('CategoryId', 1)
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
              barocode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'produck name cannot be null'
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
              barocode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
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
              barocode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
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
              barocode: '123891312',
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
              barocode: '123891312',
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
              barocode: '123891312',
              CategoryId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('msg', 'Bad Request')
              expect(response.body).toHaveProperty('errors', [
                'price name cannot be negative'
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
              barocode: null,
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
              stock: '',
              barocode: '123891312',
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
              barocode: '123891312',
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
              barocode: '123891312',
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
    describe('Case Update Product Success', () => {
      test(' (Put) it should return msg success with status 1', done => {
        request(app)
          .put(`/products/${id}`)
          .set('token', access_token)
          .send({
            name: 'sunlight',
            price: 7000,
            stock: 15,
            barocode: '123891312',
            CategoryId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('status', [1])
            expect(response.body).toHaveProperty(
              'msg',
              'success update product'
            )
            expect(response.status).toBe(200)
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
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Case Update Product failed', () => {
      test('(patch) fail in wrong product id', done => {
        request(app)
          .put(`/products/${id + 100}`)
          .set('token', access_token)
          .send({
            name: 'sunlight',
            price: 7000,
            stock: 15,
            barocode: '123891312',
            CategoryId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('status', [0])
            expect(response.body).toHaveProperty('msg', 'failed update product')
            expect(response.status).toBe(201)
            done()
          })
      })
    })
  })
})
