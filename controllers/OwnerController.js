const { sequelize, Owner, Warung } = require('../models')
const jwt = require('jsonwebtoken')
const private_key = process.env.PRIVATEKEY
const bcrypt = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GCLIENTID)

class OwnerController {
  static async register(req, res, next) {
    let { username, password, email, warung_name } = req.body
    sequelize
      .transaction(t => {
        return Owner.create(
          { username, password, email },
          { transaction: t }
        ).then(data => {
          return Warung.create(
            {
              name: warung_name,
              OwnerId: data.id
            },
            { transaction: t }
          )
        })
      })
      .then(warung => {
        res.status(201).json({
          username,
          email,
          password,
          warung_name: warung.name
        })
      })
      .catch(err => {
        next(err)
      })
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
              warung_name: data.Warung.name,
              username: data.username,
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

  // static googleSignin(req, res, next) {
  //   let payload
  //   let token
  //   client
  //     .verifyIdToken({
  //       idToken: req.headers.access_token,
  //       audience: process.env.GCLIENTID
  //     })
  //     .then(result => {
  //       payload = result.getPayload()
  //       return Owner.findOne({
  //         where: {
  //           email: payload.email
  //         }
  //       })
  //     })
  //     .then(data => {
  //       if (!data) {
  //         return Owner.create({
  //           username: payload.name,
  //           email: payload.email,
  //           password: process.env.GCLIENTSECRET
  //         })
  //       } else return data
  //     })
  //     .then(data => {
  //       let payload = {
  //         id: data.id,
  //         email: data.email,
  //         WarungId: data.Warung.id
  //       }
  //       token = jwt.sign(
  //         {
  //           payload
  //         },
  //         private_key
  //       )
  //       return Warung.create({
  //         name: data.username || 'warung-q',
  //         OwnerId: data.id
  //       })
  //     })
  //     .then(result => {
  //       res.status(200).json({
  //         token
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err, 'dari error google sign in')
  //       next(err)
  //     })
  // }
}

module.exports = OwnerController
