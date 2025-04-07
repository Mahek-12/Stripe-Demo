const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token is present in the header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user in DB
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "User not found",
        });
      }

      // Attach user to request object
      req.user = user;
      next();
    } catch (error) {
      const isExpired = error.name === "TokenExpiredError";
      return res.status(401).json({
        status: "error",
        message: isExpired ? "Token expired" : "Invalid token",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while authenticating",
    });
  }
};

module.exports = auth;
