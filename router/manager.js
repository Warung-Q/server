const router = require('express').Router()
const ManagerController = require('../controllers/ManagerController')

router.post('/register', ManagerController.register)

router.post('/login', ManagerController.login)

module.exports = router
