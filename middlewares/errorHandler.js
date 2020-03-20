module.exports = (err, req, res, next) => {
  let errObj = {}
  let status = 500
  if (err.name === 'SequelizeValidationError') {
    status = 400
    errObj.err = err.name
    errObj.errors = err.errors.map(el => el.message)
    res.status(status).json(errObj)
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    errObj.err = err.name
    errObj.errors = 'Email has already been taken'
    res.status(status).json(errObj)
  } else if (err.msg) {
    status = 404
    res.status(status).json(err)
  } else if (!err.length) {
    status = 404
    errObj.err = 'NOT FOUND'
    errObj.errors = 'DATA NOT FOUND'
    res.status(status).json(errObj)
  } else {
    errObj.err = 'INTERNAL SERVER ERROR'
    errObj.errors = err.errors.map(el => el.message)
    res.status(status).json(errObj)
  }
}
