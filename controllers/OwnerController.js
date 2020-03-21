const { Owner } = require('../models')
const jwt = require('jsonwebtoken')
const private_key = process.env.PRIVATEKEY
const bcrypt = require('../helpers/bcrypt')

class OwnerController {
  static register(req, res, next) {
    Owner.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    Owner.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(data => {
        if (data) {
          let checkPassword = bcrypt.check(req.body.password, data.password)
          if (checkPassword) {
            let payload = {
              id: data.id,
              email: data.email
            }
            let access_token = jwt.sign(
              {
                payload
              },
              private_key
            )

            res.status(200).json({
              email: data.email,
              access_token
            })
          } else {
            next({
              msg: 'login failed',
              errors: 'invalid email or password'
            })
          }
        } else {
          next({
            msg: 'login failed',
            errors: 'invalid email or password'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = OwnerController
