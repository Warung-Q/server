const { Product } = require('../models')

class ProductController {
  static findAll(req, res, next) {
    let WarungId = 1
    Product.findAll({ where: { WarungId } })
      .then(products => {
        res.status(200).json({ products: products })
      })
      .catch(err => {
        next(err)
      })
  }

  static addProduct(req, res, next) {
    const WarungId = 1
    const { name, stock, price, barcode, CategoryId, expired_date } = req.body
    Product.create({
      name,
      stock,
      price,
      barcode,
      CategoryId,
      expired_date,
      WarungId
    })
      .then(result => {
        res
          .status(201)
          .json({ product: result, msg: 'success insert new product' })
      })
      .catch(err => {
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    const id = +req.params.id
    const WarungId = 1
    let msg = 'success update product'
    const { name, stock, price, barcode, CategoryId, expired_date } = req.body
    Product.update(
      { name, stock, price, barcode, CategoryId, expired_date, WarungId },
      { where: { id } }
    )
      .then(result => {
        if (!result[0]) {
          msg = 'failed update product'
        }
        let data = {
          name,
          stock,
          price,
          barcode,
          CategoryId,
          expired_date,
          WarungId
        }
        res.status(201).json({
          status: result,
          data,
          msg
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static updateStock(req, res, next) {
    const id = +req.params.id
    let msg = 'success update product'
    const { stock } = req.body
    Product.update({ stock }, { where: { id } })
      .then(result => {
        if (!result[0]) {
          msg = 'failed update product'
        }
        res.status(201).json({ status: result, msg })
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProduct(req, res, next) {
    const id = +req.params.id
    const msg = 'success delete product'
    Product.destroy({ where: { id } })
      .then(result => {
        if (!result) {
          msg = 'failed to delete product'
        }
        res.status(200).json({ status: result, msg })
      })
      .catch(err => {
        next(err)
      })
  }

  static fOne(req, res, next) {
    console.log('masuk fOne')
    const id = +req.params.id
    Product.findOne({ where: { id } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController
