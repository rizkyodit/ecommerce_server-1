"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"Products",
			[
				{
					name: "Microvawe",
					image_url:
						"https://ecs7.tokopedia.net/img/cache/700/product-1/2020/5/7/101266040/101266040_dd7f059b-60f6-4ed6-ad1c-341f2337de2d_1000_1000",
					price: 954000,
					stock: 10,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Mesin cuci",
					image_url:
						"https://ecs7.tokopedia.net/img/cache/700/VqbcmM/2020/7/18/0d89ed45-9587-4bff-8d2b-beceff9afef6.jpg",
					price: 45000,
					stock: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Setrika",
					image_url:
						"https://ecs7.tokopedia.net/img/cache/700/product-1/2020/2/24/7679456/7679456_0b40a1e7-69d5-4f8d-9db9-c5179d97c22c_714_714.jpg",
					price: 65000,
					stock: 5,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Products", null, {});
	},
};
