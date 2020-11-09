const jwt = require("jsonwebtoken");
const secret = 'rahasiadong';

const generateToken = (data) => {
  const access_token = jwt.sign(
    { email: data.email, id: data.id, role: data.role },
    secret
  );
  return access_token;
};

const verifyToken = (token) => {
  const verified = jwt.verify(token, secret);
  return verified;
};

module.exports = { generateToken, verifyToken };