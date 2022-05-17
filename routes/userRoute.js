const express = require("express");
const userController = require("../controllers/userController");
const authenticateMiddleware = require("../middlewares/authenticate");
const router = express.Router();

//POST /users/register
router.post("/register", userController.register);
//PUT /users
router.put("/", authenticateMiddleware, userController.updateUser);
router.post("/login", userController.login);

module.exports = router;
