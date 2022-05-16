const createError = require("../utils/createError");
const { User } = require("../models/");

exports.register = async (req, res, next) => {
  try {
    //   const body = req.body
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      // return res.status(400).json({message:"Password is not match"})
      createError("Password is not match", 400);
    }

    //Create new user by model
    await User.create({ username, email, password });
    res.status(201).json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, oldPassword, newPassword, confirmNewPassword, birthDate } =
      req.body;
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      createError("User is not found", 400);
    }
    if (oldPassword !== user.password) {
      createError("Incorrect password", 400);
    }
    if (newPassword !== confirmNewPassword) {
      createError("Password is not match", 400);
    }

    await User.update(
      { email, password: newPassword, birthDate },
      { where: { id: id } }
    );
    res.status(201).json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};
