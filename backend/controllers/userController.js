import { generateToken } from "../config/generateToken.js";
import Todo from "../models/todoModel.js";
import User from "../models/userModel.js";

// @desc    Login a user
// route    api/user/login
// access   Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        todos: user.todos,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ status: "error", message: "Login Unsuccessful" });
      return;
    }
  } catch (error) {
    res
      .status(error.status)
      .json({ status: "error", message: "error message" });
  }
};

// @desc    Register a user
// route    api/user/register
// access   Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ status: "error", message: "User already exists" });
      return;
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        todos: user.todos,
        token: generateToken(user._id),
      });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Registration Unsuccessful" });
      return;
    }
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};

// @desc    Logout User
// route    api/user/logout
// access   Public
export const logoutUser = async (req, res) => {
  res.json({ message: "User Logged Out" });
};

// @desc    Get User Profile
// route    api/user/profile
// access   Private
export const getUserProfile = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user._id })
      .select("-password")
      .populate({
        path: "todos",
        model: Todo,
      });
    res.json(user);
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};

// @desc    Delete User
// route    api/user/delete
// access   Private
export const deleteUser = async (req, res) => {
  try {
    let userId = req.user._id;
    let user = await User.findByIdAndDelete({ _id: userId }).select(
      "-password"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status).json({ status: "error", message: error.message });
  }
};
