const { Product } = require("../models");

class ProductController {
	static show(req, res, next) {
		Product.findAll()
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
	static add(req, res, next) {
		let params = {
			name: req.body.name,
			image_url: req.body.image_url,
			price: req.body.price,
			stock: req.body.stock,
		};
		Product.create(params)
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
	static find(req, res, next) {
		Product.findByPk(req.params.id)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
	static edit(req, res, next) {
		let params = {
			name: req.body.name,
			image_url: req.body.image_url,
			price: req.body.price,
			stock: req.body.stock,
		};
		Product.update(params, { where: { id: req.params.id }, returning: true })
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
	static delete(req, res, next) {
		let options = {
			where: {
				id: req.params.id,
			},
			returning: true,
		};
		Product.destroy(options)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
}

module.exports = ProductController;
