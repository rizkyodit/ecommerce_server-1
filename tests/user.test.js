const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// afterAll((done) => {
// 	//hapus isi database ketika test sudah selesai
// 	queryInterface
// 		.bulkDelete("Users")
// 		.then(() => done())
// 		.catch((err) => {
// 			done();
// 		});
// });


describe("test user login POST /login", function () {
	it("login success ", function (done) {
		request(app)
			.post("/login")
			.send({ email: "admin@mail.com", password: "123456" })
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(200);
				expect(body).toHaveProperty("email", "admin@mail.com");
				expect(body).toHaveProperty("access_token", expect.any(String));
				done();
			})
			.catch((err) => {
				console.log(err, " <<<<<<<<<<<<<<<<<< ini error");
				done();
			});
	});
});

describe("test user login POST /login", function () {
	it(" login failed wrong password ", function (done) {
		request(app)
			.post("/login")
			.send({ email: "admin@mail.com", password: "xxxxx" })
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			})
			.catch((err) => {
				console.log(err, " <<<<<<<<<<<<<<<<<< ini error");
				done();
			});
	});

	it("login failed wrong email and password ", function (done) {
		request(app)
			.post("/login")
			.send({ email: "notadmin@mail.com", password: "xxxx" })

			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			})
			.catch((err) => {
				console.log(err, " <<<<<<<<<<<<<<<<<< ini error");
				done();
			});
	});

	it("login failed email and password blank ", function (done) {
		request(app)
			.post("/login")
			.send({ email: "", password: "" })
			.then((response) => {
				const { body, status } = response;
				expect(status).toBe(400);
				expect(body).toHaveProperty(Object.keys(response.body));
				done();
			})
			.catch((err) => {
				console.log(err, " <<<<<<<<<<<<<<<<<< ini error");
				done();
			});
	});
});

/**
 * 
 * const user = { email: "risyad01@gmail.com", password: "12345678" };

describe("testing regist with POST method on /register", function () {
	//if regist success
	it.only("test register success", function (done) {
		request(app)
			.post("/register")
			// .send(user)
			.send({ email: "risyad01@gmail.com", password: "12345678" })
			.then((response) => {
				// kembalian dr response

				const { body, status } = response;

				console.log(body, " <<<<<<<< ini body");
				console.log(status, " <<<<<<<< ini status");
				expect(status).toBe(201);
				expect(body).toHaveProperty("id", expect.any(Number));
				expect(body).toHaveProperty("email", "risyad01@gmail.com");
				// expect(body).toHaveProperty("email", user.email);
				expect(body).toHaveProperty(
					"message",
					"Has been successfully registered"
				);
				done();
			})
			.catch((err) => {
				done();
			});
	});

	// if regist failed
	it("test register email already exist", function (done) {
		request(app)
			.post("/register")
			.send({ email: "risyad02@gmail.com", password: "12345678" })
			.then((response) => {
				// kembalian dr response
				const { body, status } = response;
				console.log(body);
				console.log(status);
				expect(status).toBe(500);
				expect(body).toHaveProperty(
					"message",
					"Has been successfully registered"
				);
				done();
			})
			.catch((err) => {
				console.log(err, " <<<<<<<<<<<<<<<<<< ini error");
			});
	});
});
 */

// describe("test user login POST /login", function () {
// 	test("Test login success", function (done) {
// 		request(app)
// 			.post("/login")
// 			.send(user)
// 			.then((response) => {
// 				const { body, status, statusCode } = response;
// 				// console.log(ini dari response gan)
// 				expect(statusCode).toBe(200);
// 				expect(body).toHaveProperty("email", user.email);
// 				expect(body).toHaveProperty("access_token", expect.any(String));
// 				done();
// 			});
// 	});
// });
