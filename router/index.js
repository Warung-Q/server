const router = require('express').Router()
const ownerRoutes = require('./owner')
const productsRoutes = require('./products')
const managerRoutes = require('./manager')
const warungRoutes = require('./warung')
const { authentication } = require('../middlewares/authentication')
const { authorize } = require('../middlewares/authorization')

router.use('/owner', ownerRoutes)
router.use('/manager', managerRoutes)
router.use(authentication)
router.use('/products', productsRoutes)
router.use('/warung', warungRoutes)
module.exports = router
