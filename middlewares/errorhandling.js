module.exports = (err, req, res, next) => {
  let status = ''
  let error = []

  if (err.name == 'ValidationErrorItem' || err.name == 'SequelizeValidationError') {
    err.errors.forEach((el) => {
      if (el.message) {
        error.push(el.message)
      }
    })
    status = 400
  } else if (err.name == 'JsonWebTokenError') {
    status = 401
    error.push('Authentication Failed')
  } else {
    status = err.status || 500
    error.push(err.message || 'Internal Server Error')
  }
  res.status(status).json(error)
}