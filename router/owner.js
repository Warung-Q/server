const router = require('express').Router()
const OwnerController = require('../controllers/OwnerController')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

router.use(passport.initialize())
router.use(passport.session())

router.post('/register', OwnerController.register)

router.post('/login', OwnerController.login)

router.get('/authlogin', (req, res) => {
  res.render('login')
})

router.get('/login/google', OwnerController.googlePassport)

router.get(
  '/return/google',
  passport.authenticate('google', {
    failureRedirect: '/authlogin'
  })
)

passport.serializeUser(function(user, cb) {
  cb(null, user)
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj)
})

module.exports = router
