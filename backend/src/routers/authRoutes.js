const express = require("express");
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
  getMe,
} = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", auth, changePassword);
router.get("/me", auth, getMe);

module.exports = router;
