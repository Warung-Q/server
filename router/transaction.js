const router = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
router.get('/', TransactionController.findAll)
router.post('/', TransactionController.addTransaction)
module.exports = router
