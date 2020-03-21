const router = require('express').Router()
const WarungController = require('../controllers/WarungController')
const {
    authentication
} = require('../middlewares/authentication')
const {
    authorize
} = require('../middlewares/authorization')

router.use(authentication)

router.get('/', WarungController.findAll)

router.post('/add', WarungController.create)

router.get('/edit/:id', WarungController.findOne)

router.put('/edit/:id', authorize, WarungController.update)

router.delete('/delete/:id', authorize, WarungController.destroy)



module.exports = router