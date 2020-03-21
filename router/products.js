const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.findAll)
router.post('/', ProductController.addProduct)
router.get('/:id', ProductController.fOne)
router.put('/:id', ProductController.updateProduct)
router.patch('/:id', ProductController.updateStock)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router
