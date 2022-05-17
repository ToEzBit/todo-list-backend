const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { User } = require("../models");
const authenticate = async (req, res, next) => {
  try {
    const header = req.headers;
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer")) {
      createError("you are unauthorized", 401);
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      createError("you are unauthorized", 401);
    }
    const secretKey = process.env.JWT_SECRET_KEY || "1212312121";
    const decodedPayload = jwt.verify(token, secretKey);

    const user = await User.findOne({ where: { id: decodedPayload.id } });
    req.user = user;

    if (!user) {
      createError("User not found", 400);
    }
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = authenticate;
