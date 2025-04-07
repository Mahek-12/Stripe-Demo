const User = require("../models/User");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
  .strict();

const loginSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

const forgotPasswordSchema = z
  .object({
    email: z.string().email("Invalid email address"),
  })
  .strict();

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
  })
  .strict();

exports.register = async (req, res) => {
  try {
    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { name, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "Registration failed",
        message: "Email already registered",
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    // Remove password from output
    user.password = undefined;

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

exports.login = async (req, res) => {
  try {
    // Validate request body
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { email, password } = validationResult.data;

    // Find user and explicitly select password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordCorrect = await user.correctPassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Remove password from output
    user.password = undefined;

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Server error",
      message: "An error occurred while logging in",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "The user no longer exists",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
      message: "An error occurred while fetching user data",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const validationResult = forgotPasswordSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { email } = validationResult.data;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "There is no user with that email address exists",
      });
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;

    return res.status(200).json({
      message: "Password reset link has been sent",
      resetURL,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Server error",
      message: "An error occurred while resetting password",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        error: "Token invalid or expired",
      });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password has been reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Server error",
      message: "Something went wrong",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const validationResult = changePasswordSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validationResult.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    const { currentPassword, newPassword } = validationResult.data;

    const userId = req.user._id; // Comes from auth middleware
    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isPasswordCorrect = await user.correctPassword(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Authentication failed",
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Password has been updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
      message: "An error occurred while updating the password",
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Server error",
      message: "An error occurred while logging out",
    });
  }
};
