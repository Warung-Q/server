const router = require('express').Router()
const ownerRoutes = require('./owner')
const productsRoutes = require('./products')
const managerRoutes = require('./manager')
const warungRoutes = require('./warung')

router.use('/owner', ownerRoutes)
router.use('/manager', managerRoutes)
router.use('/products', productsRoutes)
router.use('/warung', warungRoutes)
module.exports = router
