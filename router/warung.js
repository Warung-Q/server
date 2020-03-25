const router = require('express').Router()
const WarungController = require('../controllers/WarungController')
const { authentication } = require('../middlewares/authentication')
const { authorize } = require('../middlewares/authorization')

// router.use(authentication)

router.get('/', WarungController.findAll)

router.post('/', WarungController.create)

router.get('/:id', WarungController.findOne)

router.put('/:id', authorize, WarungController.update)

router.delete('/:id', authorize, WarungController.destroy)

module.exports = router
