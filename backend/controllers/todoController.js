import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";

// @desc    Get All Todos
// route    api/todo/getTodos
// access   Private
export const getTodos = async (req, res) => {
  try {
    const todos = await User.findById(req.user._id).select("todos").populate({
      path: "todos",
      model: Todo,
    });

    if (todos.todos.length > 0) {
      res.status(200).json(todos);
    } else {
      res
        .status(200)
        .json({ status: "success", message: "No Todos were found" });
    }
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};

// @desc    Add a todo item
// route    api/todo/addTodo
// access   Private
export const addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const todo = await Todo.create({ title, description, status });

    if (todo) {
      res.status(201).json({
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
      });

      await User.findByIdAndUpdate(req.user._id, {
        $push: { todos: todo._id },
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Todo item was not created" });
    }
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};

// @desc    Delete a todo item
// route    api/todo/deleteTodo/:id
// access   Private
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);

    if (todo) {
      res.status(201).json({
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
      });

      await User.findByIdAndUpdate(req.user._id, {
        $pull: { todos: todo._id },
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Todo item was not deleted" });
    }
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};

// @desc    Update a todo item
// route    api/todo/updateTodo/:id
// access   Private
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);

    if (todo) {
      todo.title = req.body.title || todo.title;
      todo.description = req.body.description || todo.description;
      todo.status = req.body.status || todo.status;
      await todo.save();
      res.status(200).json({ todo });
    } else {
      res.status(400).json({ status: "error", message: "Todo Not Found" });
    }
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};
