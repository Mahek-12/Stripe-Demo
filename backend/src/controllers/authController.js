const User = require("../models/User");
// const { z } = require("zod");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  changePasswordSchema,
} = require("../schemas");

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

exports.getProfile = async (req, res) => {
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

    const userId = req.user._id;
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max-size
  },
});

exports.uploadProfilePicture = async (req, res) => {
  try {
    //Handles single file upload
    upload.single("profilePicture")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).json({
          error: "Upload error",
          message: err.message,
        });
      } else if (err) {
        // An unknown error occurred
        return res.status(400).json({
          error: "Upload error",
          message: err.message,
        });
      }

      // Check if file exists
      if (!req.file) {
        return res.status(400).json({
          error: "Validation failed",
          message: "Please upload a file",
        });
      }

      const userId = req.user._id; // From auth middleware
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      // Update user with file path
      user.profilePicture = req.file.path;
      await user.save();

      return res.status(200).json({
        message: "Profile picture uploaded successfully",
        file: {
          filename: req.file.filename,
          path: req.file.path,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
      message: "An error occurred while uploading the file",
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
