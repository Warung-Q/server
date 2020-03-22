module.exports = (err, req, res, next) => {
  let errObj = {}
  let status = 500
  if (err.name === 'SequelizeValidationError') {
    status = 400
    errObj.msg = 'Bad Request'
    errObj.errors = err.errors.map(el => el.message)
    res.status(status).json(errObj)
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    errObj.msg = 'Bad Request'
    errObj.errors = 'Email has already been taken'
    res.status(status).json(errObj)
  } else if (err.msg) {
    if (err.status) {
      status = err.status
    } else {
      status = 404
    }
    res.status(status).json(err)
  } else if (err.name === 'JsonWebTokenError') {
    status = 403
    errObj.msg = 'Forbidden'
    errObj.errors = 'You must login first'
    res.status(status).json(errObj)
  } else if (!err.length) {
    status = 404
    errObj.msg = 'NOT FOUND'
    errObj.errors = 'DATA NOT FOUND'
    res.status(status).json(errObj)
  } else {
    errObj.err = 'INTERNAL SERVER ERROR'
    res.status(status).json(errObj)
  }
}
