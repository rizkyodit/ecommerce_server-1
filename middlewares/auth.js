const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const userData = verifyToken(access_token);
    let user = await User.findOne({
      where: {
        email: userData.email,
      },
    });
    if (user) {
      req.userData = userData;
      next();
    } else {
      throw { message: "Doesnt recognize user..", statusCode: 401 };
    }
  } catch (error) {
    return next(error);
  }
};

const authorization = (req, res, next) => {
  User.findByPk(req.userData.id)
    .then((user) => {
      if (user.role === "Admin") {
        next();
      } else {
        throw { message: "You are not an admin!", statusCode: 403 };
      }
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = { authentication, authorization };
