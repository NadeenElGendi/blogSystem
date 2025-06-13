import { Router } from "express";
const router = Router();
import { check, validationResult } from "express-validator";
import { register, login, getUser } from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

// @route   POST /api/auth/register
// @desc    Register user
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  register
);

// @route   POST /api/auth/login
// @desc    Login user
router.post(
  "/login",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  login
);

// @route   GET /api/auth/user
// @desc    Get user data
router.get("/user", auth, getUser);

export default router;
