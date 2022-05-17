const createError = require("../utils/createError");
const { User } = require("../models/");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    //   const body = req.body
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      // return res.status(400).json({message:"Password is not match"})
      createError("Password is not match", 400);
    }
    if (!password) {
      createError("password is require", 400);
    }
    //Create new user by model
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { email, oldPassword, newPassword, confirmNewPassword, birthDate } =
      req.body;
    const user = await User.findOne({ where: { id: id } });

    const checkedPassword = await bcrypt.compare(oldPassword, user.password);

    // if (!user) {
    //   createError("User is not found", 400);
    // }
    // if (oldPassword !== user.password) {
    //   createError("Incorrect password", 400);
    // }
    // if (newPassword !== confirmNewPassword) {
    //   createError("Password is not match", 400);
    // }

    if (!checkedPassword) {
      createError("Incorrect password", 400);
    }

    if (newPassword !== confirmNewPassword) {
      createError("new password is not match", 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await User.update(
      {
        email,
        password: hashedPassword,
        birthDate,
        last_update_password: new Date(),
      },
      { where: { id: id } }
    );
    res.status(201).json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      createError("username is require", 400);
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      createError("username or password is invalid", 401);
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      createError("username or password is invalid", 401);
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {
      algorithm: "HS512",
      expiresIn: "30d",
    });

    res.status(200).json({ message: "login success", token });
  } catch (err) {
    next(err);
  }
};
