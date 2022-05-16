const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//POST /users/register
router.post("/register", userController.register);
//PUT /users
router.put("/:id", userController.updateUser);

module.exports = router;
