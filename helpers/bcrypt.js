const bcrypt = require("bcryptjs");

let comparePass = (inputPass, password) => {
	let isValid = bcrypt.compareSync(inputPass, password);
	return isValid;
};

let generatePass = (inputPass) => {
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(inputPass, salt);
	return hash;
};

module.exports = { comparePass, generatePass };
