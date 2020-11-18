const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Bcrypt {

  static hashPassword(data) {
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    const hash = bcrypt.hashSync(data, salt)
    return hash
  }

  static comparePassword(data, hash) {
    return bcrypt.compareSync(data, hash)
  }
}

class Jwt {

  static signToken(data) {
    return jwt.sign(data, process.env.KEY)
  }

  static verifyToken(data) {
    return jwt.verify(data, process.env.KEY)
  }
}

module.exports = {
  Bcrypt,
  Jwt
}