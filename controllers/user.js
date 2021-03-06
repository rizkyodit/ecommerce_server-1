const { comparePassword, Jwt } = require('../helpers/index')
const { User } = require('../models/')

class UserController {

  static async register(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const user = await User.create(payload)
      const result = {
        id: user.id,
        role: user.role,
        email: user.email
      }
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const user = await User.findOne({ where: { email: payload.email } })
      if (!user) {
        throw { message: 'Wrong Email/Password', status: 404 }
      } else if (!comparePassword(payload.password, user.password)) {
        throw { message: 'Wrong Email/Password', status: 401 }
      } else {
        const token = Jwt.signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ token, id: user.id})
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController