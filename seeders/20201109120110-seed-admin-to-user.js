"use strict";
const { generatePass } = require("../helpers/bcrypt");
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "admin@mail.com",
					password: generatePass("123456"),
					role: "Admin",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
