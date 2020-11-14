const { Product } = require('../models/')

class ProductController {

  static async showAll(req, res, next) {
    try {
      const list = await Product.findAll()
      res.status(200).json(list)
    } catch (error) {
      next(error)
    }
  }

  static async showOne(req, res, next) {
    const id = req.params.id
    try {
      const data = await Product.findByPk(+id)
      if (!data) {
        throw { message: 'Product Not Found', status: 404 }
      } else {
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    const data = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    try {
      const add = await Product.create(data)
      res.status(201).json(add)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    const id = req.params.id
    const data = {
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock
    }
    try {
      const edit = await Product.update(data, { where: { id }, returning: true })
      if (edit[0] == 0) {
        throw { message: 'Product Not Found', status: 404 }
      } else {
        res.status(200).json(edit[1][0])
      }
    } catch (error) {
      next(error)
    }
  }

  static async deleted(req, res, next) {
    const id = req.params.id
    try {
      const deleted = await Product.destroy({ where: { id } })
      if (!deleted) {
        throw { message: 'Product Not Found', status: 404 }
      } else {
        res.status(200).json('Product Deleted Successfully')
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController