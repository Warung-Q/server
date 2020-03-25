const { Warung } = require('../models')

module.exports = {
  authorize: (req, res, next) => {
    Warung.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (data) {
          if (data.OwnerId === req.OwnerId) {
            next()
          } else {
            next({
              status: 401,
              msg: 'NOT AUTHORIZED',
              errors: 'YOU ARE NOT AUTHORIZE TO DO THIS ACTION'
            })
          }
        } else {
          next({
            status: 401,
            msg: 'NOT AUTHORIZED',
            errors: 'YOU ARE NOT AUTHORIZE TO DO THIS ACTION'
          })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}
