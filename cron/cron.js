const cron = require('node-cron')
const { Product, Category, Warung, Owner, News } = require('../models')
const nodemailer = require('nodemailer')

function cron_expired() {
  let date1
  let date2 = new Date()
  cron.schedule('0 0 * * *', () => {
    //cron running daily
    // console.log('cron running daily')
    Warung.findAll({
      include: [
        {
          model: Product
        },
        {
          model: Owner
        }
      ],
      order: [['id', 'ASC']]
    })
      .then(result => {
        let output = []
        result.forEach(el => {
          output.push({
            id: el.id,
            name: el.name,
            OwnerId: el.OwnerId,
            ManagerId: el.ManagerId,
            OwnerName: el.Owner.dataValues.username,
            OwnerEmail: el.Owner.dataValues.email,
            Products: el.Products.map(product => {
              date1 = product.expired_date
              let diffTime = date1.getTime() - date2.getTime() //date calculation in time
              let diffDay = Math.ceil(diffTime / (1000 * 3600 * 24)) //date calucalation in days
              if (diffDay <= 14 && diffDay > 0 && product.stock > 0) {
                return {
                  id: product.dataValues.id,
                  name: product.dataValues.name,
                  price: product.dataValues.price,
                  stock: product.dataValues.stock,
                  barcode: product.dataValues.barcode,
                  expired_date: product.dataValues.expired_date,
                  CategoryId: product.dataValues.CategoryId,
                  WarungId: product.dataValues.WarungId
                }
              } else {
                return
              }
            })
          })
        })
        console.log(output)

        //send output to email via nodemailer here
        let configMail, transporter, emailTarget, mail
        configMail = {
          service: 'gmail',
          auth: {
            user: 'awarungq@gmail.com',
            pass: 'admin_warung123'
          }
        }
        transporter = nodemailer.createTransport(configMail)
        let newsPromises = []
        output.forEach(list => {
          emailTarget = list.OwnerEmail
          let productName = []
          list.Products.forEach(el => {
            if (el !== undefined) {
              productName.push(el.name)
            }
          })
          if (productName.length) {
            mail = {
              to: emailTarget,
              from: 'admin Warung Q',
              subject: 'Expiring Product',
              html: `<b>product expiring within less than 2 weeks:</b>
              <br>${productName}<br>
              <br>Please check your product<br>
              `
            }
            transporter.sendMail(mail)
            const newPromise = News.create({
              message: `product expiring within less than 2 weeks:${productName}`,
              WarungId: list.id
            })
            newsPromises.push(newPromise)
          }
        })
        return Promise.all(newsPromises).then(result => {
          console.log(result)
        })
      })
      .catch(err => {
        console.log(err)
      })
  })
}

module.exports = cron_expired()
