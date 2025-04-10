const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const validateRequest = require("../middleware/validateRequest");
const {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/authValidators");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post("/login", validateRequest(loginSchema), authController.login);

router.get("/profile", authenticateToken, authController.getProfile);

router.post("/logout", authenticateToken, authController.logout);

router.post(
  "/change-password",
  authenticateToken,
  validateRequest(changePasswordSchema),
  authController.changePassword
);

router.post(
  "/forgot-password",
  validateRequest(forgotPasswordSchema),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  authController.resetPassword
);

router.post(
  "/upload-profile-picture",
  authenticateToken,
  upload.single("profilePicture"),
  authController.uploadProfilePicture
);

module.exports = router;
