const { User } = require("../models/")

async function authorization(req, res, next) {
  try {
    if (req.loginCredential) {
      const user = await User.findOne({ where: { id: req.loginCredential.id } })
      if (user.role == 'admin') {
        next()
      } else {
        throw { message: 'Not Authorized', status: 401 }
      }
    } else {
      throw { message: 'Not Authorized', status: 401 }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization