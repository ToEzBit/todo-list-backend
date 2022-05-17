const express = require("express");
const todoController = require("../controllers/todoController");
const userMiddleware = require("../middlewares/user.js");
const router = express.Router();

router.post("/create", todoController.createTodo);
router.get("/", todoController.getAllTodo);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
module.exports = router;
