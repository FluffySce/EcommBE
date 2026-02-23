import express from "express";
import {
  register,
  login,
  logout,
  renderLogin,
  renderRegister,
} from "../controllers/authController.js";
const router = express.Router();

// Render login page
router.get("/login", renderLogin);

// Render register page
router.get("/register", renderRegister);

// Process login
router.post("/login", login);

// Process registration
router.post("/register", register);

// Logout
router.get("/logout", logout);

export default router;
