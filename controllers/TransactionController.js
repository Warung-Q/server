const { sequelize, Transaction, Product } = require('../models')
const nodemailer = require('nodemailer')

class TransactionController {
  static async addTransaction(req, res, next) {
    const { carts, email } = req.body
    let total = 0
    let WarungId = req.WarungId
    let configMail, transporter, emailTarget, mail
    configMail = {
      service: 'gmail',
      auth: {
        user: 'awarungq@gmail.com',
        pass: 'admin_warung123'
      }
    }
    transporter = await nodemailer.createTransport(configMail)

    sequelize
      .transaction(t => {
        const promises = []
        carts.forEach(el => {
          const newPromise = Product.findOne({
            where: { id: el.ProductId },
            transaction: t
          })
          total += el.total_price
          promises.push(newPromise)
        })
        return Promise.all(promises).then(products => {
          const updatePromises = []
          products.forEach((el, index) => {
            carts.forEach(cart => {
              cart.name = el.name
            })
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
        let str = ''
        result.forEach((el, index) => {
          str += `${index + 1}. ${el.name}  ${el.total_price} <br>`
        })
        if (email) {
          emailTarget = email
          mail = {
            to: emailTarget,
            from: 'admin Warung Q',
            subject: 'Transaction',
            html: `<b>product transaction:</b><br>${str}<br><b>Total : </b>${total}`
          }
          transporter.sendMail(mail)
        }
        res.status(201).json({ result, total })
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
        next(err)
      })
  }
}

module.exports = TransactionController
