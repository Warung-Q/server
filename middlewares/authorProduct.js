const { Product } = require('../models')

module.exports = {
  authorize: (req, res, next) => {
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (data) {
          if (data.WarungId === req.WarungId) {
            next()
          } else {
            let err = {
              status: 401,
              msg: 'NOT AUTHORIZED',
              errors: 'YOU ARE NOT AUTHORIZE TO DO THIS ACTION'
            }
            next(err)
          }
        } else {
          next({
            status: 404,
            msg: 'NOT FOUND',
            errors: 'DATA NOT FOUND'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}
