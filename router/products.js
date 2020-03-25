const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const { authorize } = require('../middlewares/authorProduct')
router.get('/', ProductController.findAll)
router.post('/', ProductController.addProduct)
router.get('/:id', ProductController.fOne)
router.put('/:id', authorize, ProductController.updateProduct)
router.patch('/:id', authorize, ProductController.updateStock)
router.delete('/:id', authorize, ProductController.deleteProduct)

module.exports = router
