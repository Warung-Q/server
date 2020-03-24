const { sequelize, Owner, Warung } = require('../models')
const jwt = require('jsonwebtoken')
const private_key = process.env.PRIVATEKEY
const bcrypt = require('../helpers/bcrypt')
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook').Strategy
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {
  OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.GCLIENTID);


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

  static googleSignin(req, res, next) {
    console.log("masuk ke google controller")
    let payload
    client.verifyIdToken({
            idToken: req.headers.access_token,
            audience: process.env.GCLIENTID
        })
        .then(result => {
            payload = result.getPayload();
            console.log(result, "==========")
            return Owner.findOne({
                where: {
                    email: payload.email
                }
            });
        })
        .then(data => {
            if (!data) {
                return Owner.create({
                    username: payload.name,
                    email: payload.email,
                    password: process.env.GCLIENTSECRET,
                });
            } else return data;
        })
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email,
                WarungId: data.Warung.id
            };
            let token = jwt.sign({
                payload
            }, private_key);
            res.status(200).json({
                token
            });
        })
        .catch(err => {
            console.log(err, "dari error google sign in")
            next(err);
        });
  }

  // static googlePassport(req, res, next) {
  //   console.log('Masuk ke controller')
  //   passport.use(
  //     new GoogleStrategy(
  //       {
  //         clientID: process.env.GCLIENTID,
  //         clientSecret: process.env.GCLIENTSECRET,
  //         callbackURL: '/owner/return/google'
  //       },
  //       function(accessToken, refreshToken, profile, callback) {
  //         Owner.findOne({
  //           where: {
  //             email: profile.emails[0].value
  //           }
  //         })
  //           .then(data => {
  //             if (!data) {
  //               return Owner.create({
  //                 username: profile.displayName,
  //                 email: profile.emails[0].value,
  //                 password: process.env.GCLIENTSECRET
  //               })
  //             } else {
  //               console.log(data, ']]]]]]]]]]Data udah ada')
  //               return data
  //             }
  //           })
  //           .then(result => {
  //             let payload = {
  //               id: result.id,
  //               email: result.email
  //             }
  //             let token = jwt.sign(
  //               {
  //                 payload
  //               },
  //               private_key
  //             )
  //             res.status(200).json({
  //               token
  //             })
  //             console.log(token, '[[[[[[[[[[[[[')
  //           })
  //           .catch(err => {
  //             console.log(err, 'dari error google sign in')
  //           })
  //         console.log(profile, '>>>>>>>>profilegoogle')
  //       }
  //     )
  //   )

  //   passport.authenticate('google', {
  //     scope: [
  //       'https://www.googleapis.com/auth/plus.login', //dari dokumentasi
  //       'https://www.googleapis.com/auth/userinfo.email' //buat ngambil email
  //     ]
  //   })(req, res, next)
  // }
}

module.exports = OwnerController
