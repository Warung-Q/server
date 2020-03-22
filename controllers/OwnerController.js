const { Owner, Warung } = require('../models')
const jwt = require('jsonwebtoken')
const private_key = process.env.PRIVATEKEY
const bcrypt = require('../helpers/bcrypt')

class OwnerController {
  static async register(req, res, next) {
    try {
      const data = await Owner.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      const warung = await Warung.create({
        name: `warung ${data.username}`,
        OwnerId: data.id
      })
      const { name } = warung
      const { email, username } = data
      res
        .status(201)
        .json({ username, email, password: req.body.password, warung: name })
    } catch (err) {
      next(err)
    }
  }

  static login(req, res, next) {
    const { email } = req.body
    Owner.findOne({
      where: {
        email
      },
      include: Warung
    })
      .then(data => {
        if (data) {
          let checkPassword = bcrypt.check(req.body.password, data.password)
          if (checkPassword) {
            let payload = {
              id: data.id,
              email: data.email,
              WarungId: data.Warung.id
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
