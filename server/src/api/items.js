const express = require("express");
const Todo = require("../../models/todoModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find({});
    res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `Todo with id ${id} deleted with success` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body);
    if (!todo)
      return res
        .status(404)
        .json({ message: `Todo with id ${id} don't exist` });

    const updatedTodo = await Todo.findById(id);
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
