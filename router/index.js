const router = require('express').Router()
const ownerRoutes = require('./owner')
const productsRoutes = require('./products')
const managerRoutes = require('./manager')

router.use('/owner', ownerRoutes)
router.use('/manager', managerRoutes)
router.use('/products', productsRoutes)

module.exports = router
