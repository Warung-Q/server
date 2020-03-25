const router = require('express').Router()
const OwnerController = require('../controllers/OwnerController')

router.post('/register', OwnerController.register)

router.post('/login', OwnerController.login)

// router.post('/google_signin', OwnerController.googleSignin)

module.exports = router
