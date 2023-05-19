const jwt = require("jsonwebtoken");

const managerAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
