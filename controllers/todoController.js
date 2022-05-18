const { Todo } = require("../models");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      completed,
      dueDate,
      userId: req.user.id,
    });
    res.status(201).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ result: todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ where: { id: id, userId: req.user.id } });
    res.status(200).json({ result: todo });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed, dueDate } = req.body;

    // const newValue = {};
    // if (!title) {
    //   newValue.title = title;
    // }
    // if (!completed) {
    //   newValue.completed = completed;
    // }
    // if (!dueDate) {
    //   newValue.dueDate = dueDate;
    // }

    const result = await Todo.update(
      { title, completed, dueDate },
      { where: { id, userId: req.user.id } }
    );

    if (result[0] === 0) {
      createError("todo with this id not found", 400);
    }
    res.status(200).json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Todo.destroy({
      where: { id: id, userId: req.user.id },
    });
    if (result === 0) {
      createError("todo with this id not found,400");
    }
    res.status(204).json();
  } catch (err) {}
};
