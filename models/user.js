"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: {
						args: true,
						msg: `Please input email format!`,
					},
					notEmpty: true,
				},
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [5],
						msg: `Password minimum 5`,
					},
					notEmpty: true,
				},
			},
			role: {
				type: DataTypes.STRING,
				validate: {
					notEmpty: {
						args: true,
						msg: `Please fill the role!`,
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);

	User.beforeCreate((user, options) => {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(user.password, salt);
		user.password = hash;
	});
	return User;
};
