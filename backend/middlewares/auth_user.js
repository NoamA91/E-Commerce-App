const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = (req, res, next) => {
  const token = req.header("Authorization");
  try {
    if (!token) {
      throw new Error("Invalid token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Access denied",
      error: error.message,
    });
  }
};
module.exports = userAuth;
