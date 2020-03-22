const { Owner } = require('../models')
const jwt = require('jsonwebtoken')
const private_key = process.env.PRIVATEKEY
const bcrypt = require('../helpers/bcrypt')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy


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
        // console.log(err)
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
        console.log(err)
        next({
          msg: 'login failed',
          errors: 'invalid email or password'
        })
      })
  }

  static googlePassport(req, res, next) {
    console.log("Masuk ke controller")
    passport.use(new GoogleStrategy({
      clientID: process.env.GCLIENTID,
      clientSecret: process.env.GCLIENTSECRET,
      callbackURL: '/owner/return/google'
    },
    function(accessToken, refreshToken, profile, callback) {
      Owner.findOne({
        where: {
          email: profile.emails[0].value
        }
      })
        .then(data => {
          if (!data) {
            return Owner.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: process.env.GCLIENTSECRET
            });
          } else {
            console.log(data, "]]]]]]]]]]Data udah ada")
            return data;
          } 
        })
        .then(result => {
          let payload = {
            id: result.id,
            email: result.email
          };
          let token = jwt.sign({
            payload
          }, private_key);
          res.status(200).json({
              token
          });
          console.log(token, "[[[[[[[[[[[[[")
        })
        .catch(err => {
          console.log(err, "dari error google sign in")
        })
        console.log(profile, ">>>>>>>>profilegoogle")
      }
    ))

    passport.authenticate('google', { 
      scope: [
        'https://www.googleapis.com/auth/plus.login', //dari dokumentasi
        'https://www.googleapis.com/auth/userinfo.email' //buat ngambil email
      ] 
    })(req, res, next)
  }

  
}

module.exports = OwnerController
