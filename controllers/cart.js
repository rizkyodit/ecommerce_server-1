const { Cart, Product } = require('../models/')

class CartController {

  static async addCart (req, res, next) {
    const data = {
      UserId: req.loginCredential.id,
      ProductId: req.body.ProductId,
      amount: req.body.amount
    }
    try {
      const add = await Cart.create(data)
      res.status(201).json(add)
    } catch (error) {
      next(error)
    }
  }

  static async fetchCart (req, res, next) {
    const UserId = req.loginCredential.id
    try {
      const fetch = await Cart.findAll({ where: { UserId }, include: { model: Product }})
      if (!fetch) {
        throw { message: 'Cart Not Found', status: 404 }
      } else {
        res.status(200).json(fetch)
      }
    } catch (error) {
      next(error)
    }
  }

  static async editCart (req, res, next) {
    const { ProductId, amount } = req.body
    const UserId = req.loginCredential.id
    try {
      const edit = await Cart.update({ amount }, { where: { UserId, ProductId }, returning: true })
      if (edit[0] == 0) {
        throw { message: 'Cart Not Found', status: 404 }
      } else {
        res.status(200).json(edit[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleteCart (req, res, next) {
    const id = req.body.id
    try {
      const deleted = await Cart.destroy({ where: { id }})
      if (!deleted) {
        throw { message: 'Cart Not Found', status: 404 }
      } else {
        res.status(200).json('Cart Deleted Succesfully')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CartController