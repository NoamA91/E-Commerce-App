const jwt = require("jsonwebtoken");
const User = require("../models/User"); // import the User model

const adminAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "Internal server error. JWT secret not found.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // find user by id

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.tokens.some(t => t.token === token)) { // check if token exists in tokens array
      return res.status(401).json({
        message: "Access denied. Invalid token.",
      });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
      });
    }

    req.user = user;
    next();
  } catch (error) {

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Token expired",
        error: error.message,
      });
    }

    else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Invalid token",
        error: error.message,
      });
    }

    else {
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

module.exports = adminAuth;
