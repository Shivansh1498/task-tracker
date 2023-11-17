import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Todo = new mongoose.model("Todo", todoSchema);

export default Todo;
