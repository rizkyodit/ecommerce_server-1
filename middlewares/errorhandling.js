module.exports = (err, req, res, next) => {
  let status = ''
  let error = []
  console.log(err)
  if (err.name == 'ValidationErrorItem' || err.name == 'SequelizeValidationError' || err.errors[0].type == 'unique violation') {
    err.errors.forEach((el) => {
      if (el.message) {
        error.push(el.message)
      }
    })
    status = 400
  } else if (err.name == 'JsonWebTokenError') {
    status = 401
    error.push('Authentication Failed')
  } else if (err.name == 'SequelizeForeignKeyConstraintError') {
    status = 500
    error.push('Internal Server Error')
  } else {
    status = err.status || 500
    error.push(err.message || 'Internal Server Error')
  }
  res.status(status).json(error)
}