const { Product, Category } = require('../models')
const nodemailer = require('nodemailer')

class ProductController {
  static async findAll(req, res, next) {
    let configMail, transporter, emailTarget, mail
    configMail = {
      service: 'gmail',
      auth: {
        user: 'awarungq@gmail.com',
        pass: 'admin_warung123'
      }
    }
    transporter = await nodemailer.createTransport(configMail)
    let WarungId = req.WarungId
    Product.findAll({
      where: { WarungId },
      include: Category,
      order: [['id', 'ASC']]
    })
      .then(result => {
        emailTarget = 'baufakhran@students.itb.ac.id'
        let output = result.map(el => {
          return {
            id: el.id,
            name: el.name,
            price: el.price,
            stock: el.stock,
            barcode: el.barcode,
            expired_date: el.expired_date,
            category: el.Category.name,
            CategoryId: el.CategoryId
          }
        })
        mail = {
          to: emailTarget,
          from: configMail.auth.user,
          subject: 'add new product',
          html: `new product :hai`
        }
        transporter.sendMail(mail)
        res.status(200).json({ products: output })
      })
      .catch(err => {
        next(err)
      })
  }

  static addProduct(req, res, next) {
    const WarungId = req.WarungId
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
        res.status(201).json({ status: result, msg })
      })
      .catch(err => {
        next(err)
      })
  }

  static async deleteProduct(req, res, next) {
    const id = +req.params.id
    const msg = 'success delete product'
    let result = await Product.destroy({ where: { id } })
    res.status(200).json({ status: result, msg })
  }

  static async fOne(req, res, next) {
    const id = +req.params.id
    let data = await Product.findOne({ where: { id } })
    if (data) {
      res.status(200).json(data)
    } else {
      next({ err: 'Not Found' })
    }
  }
}

module.exports = ProductController
