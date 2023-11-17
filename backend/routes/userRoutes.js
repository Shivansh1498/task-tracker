import express from "express";
import {
  deleteUser,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

// Protected Routes
router.get("/profile", protect, getUserProfile);
router.delete("/delete", protect, deleteUser);

export default router;
