const jwt = require("jsonwebtoken");
const User = require("../models/User"); // import the User model

const managerAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id); // find user by id

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.tokens.includes(token)) { // check if token exists in tokens array
      return res.status(401).json({
        message: "Access denied. Invalid token.",
      });
    }

    if (decoded.role !== "manager") {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Access denied. Invalid token.",
      error: error.message,
    });
  }
};

module.exports = managerAuth;
