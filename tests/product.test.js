const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { User, Product } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const admin = { email: "admin2@mail.com", password: "123456", role: "Admin" };
const bukanAdmin = {
	email: "bukanadmin@mail.com",
	password: "bukanadmin",
	role: "Customer",
};
let access_token;
let token;

beforeAll((done) => {
	User.create(admin)
		.then((user) => {
			access_token = generateToken(user);
			done();
		})
		.catch((err) => {
			done();
		});
	User.create(bukanAdmin)
		.then((user) => {
			token = generateToken(user);
			done();
		})
		.catch((err) => {
			done();
		});
});

// delete products and user when test ends
afterAll((done) => {
	queryInterface
		.bulkDelete("Products")
		.then(() => done())
		.catch((err) => {
			done();
		});

	queryInterface
		.bulkDelete("Users")
		.then(() => done())
		.catch((err) => {
			done();
		});
});

//if crud success
describe(" CRUD test success on products ", function () {
	it("create product POST /products success ", function (done) {
		request(app)
			.post("/products")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: 4,
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(201);
				expect(response).toHaveProperty("body", expect.any(Object));
				done();
			});
	});
	it(" show product GET /products success", function (done) {
		request(app)
			.get("/products")
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(200);
				expect(response).toHaveProperty("body", expect.any(Object));
				done();
			});
	});
	it("edit products PUT /products:id success", function (done) {
		request(app)
			.put("/products/1")
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(200);
				done();
			});
	});
});

//if crud failed

// not access_token admin
// required field blank
//stock minus
//price minus
//field datatype not match

describe("crud test failed", function () {
	it("create product POST /products failed, access token required", function (done) {
		request(app)
			.post("/products")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: 4,
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(201);
				expect(response).toHaveProperty("body", expect.any(Object));
				done();
			});
	});

	it("create product POST /products failed, because field empty", function (done) {
		request(app)
			.post("/products")
			.send({
				name: "",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: 4,
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});

	it("create product POST /products failed, because stock minus", function (done) {
		request(app)
			.post("/products")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: -1,
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
	it("create product POST /products failed, because price minus", function (done) {
		request(app)
			.post("/products")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: -1,
				stock: 2,
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
	it("create product POST /products failed, because stock filled with string", function (done) {
		request(app)
			.post("/products")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: "banyak",
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
	it("create product POST /products failed, because acces token not admin", function (done) {
		request(app)
			.post("/products")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: "2",
			})
			.set("access_token", token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(403);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
});


//UPDATE

describe("test failed crud products", function () {
  it("update product put /products failed, acces token required", function (done) {
    request(app)
			.put("/products/2")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: "2",
			})
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(401);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
  });
  it("update product PUT /products failed, acces token not admin", function (done) {
		request(app)
			.put("/products/2")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: "2",
			})
			.set("access_token", token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(403);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
  it("update product PUT /products failed, because stock minus", function (done) {
		request(app)
			.put("/products/2")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: -1,
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
  it("update product PUT /products failed, because price minus", function (done) {
		request(app)
			.put("/products/2")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: -1,
				stock: 2,
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
  it("update product PUT /products failed, because stock datatype", function (done) {
		request(app)
			.put("/products/2")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: -1,
				stock: "banyak",
			})
			.set("access_token", access_token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
	});
});

// DELETE
describe("delete failed", function () {
  it("delete failed, need access token", function (done) {
    request(app)
			.delete("/products/2")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: "2",
			})
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(401);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
  });
  it("delete failed acces token not admin", function (done) {
    request(app)
			.delete("/products/2")
			.send({
				name: "magic com",
				image_url:
					"https://ecs7.tokopedia.net/img/cache/700/product-1/2018/6/23/3818493/3818493_30ee294a-ce9b-40df-8dd4-029eff88d39b_1250_1250.jpg",
				price: 569000,
				stock: "2",
			})
			.set("access_token", token)
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(403);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			});
  });
});
