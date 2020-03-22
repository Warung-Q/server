const { sequelize, Transaction, Product } = require('../models')

class TransactionController {
  static addTransaction(req, res, next) {
    const { carts } = req.body
    let WarungId = req.WarungId
    sequelize
      .transaction(t => {
        const promises = []
        carts.forEach(el => {
          const newPromise = Product.findOne({
            where: { id: el.ProductId },
            transaction: t
          })
          promises.push(newPromise)
        })
        return Promise.all(promises).then(products => {
          const updatePromises = []
          products.forEach((el, index) => {
            const data = {
              stock: el.stock - carts[index].quantity
            }
            const newPromise = Product.update(data, {
              where: { id: el.id },
              transaction: t
            })
            updatePromises.push(newPromise)
          })
          return Promise.all(updatePromises).then(products => {
            const transPromises = []
            carts.forEach(el => {
              el.WarungId = WarungId
              const newPromise = Transaction.create(el, {
                transaction: t
              })
              transPromises.push(newPromise)
            })
            return Promise.all(transPromises)
          })
        })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static findAll(req, res, next) {
    let WarungId = req.WarungId
    Transaction.findAll({ where: { WarungId }, include: Product })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
}

module.exports = TransactionController
