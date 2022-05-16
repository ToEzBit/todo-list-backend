const { User } = require("../models");
const createError = require("../utils/createError");
exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const user = await User.findOne({ where: { id: userId ?? 0 } });

    if (!user) {
      createError("User not found", 400);
    }
    next();
  } catch (err) {
    next(err);
  }
};
