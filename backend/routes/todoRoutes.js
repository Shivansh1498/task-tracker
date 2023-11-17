import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  getTodos,
} from "../controllers/todoController.js";

const router = express.Router();

// Protected routes
router.get("/getTodos", protect, getTodos);
router.post("/addTodo", protect, addTodo);
router.delete("/deleteTodo/:todoId", protect, deleteTodo);
router.put("/updateTodo/:todoId", protect, updateTodo);

export default router;
