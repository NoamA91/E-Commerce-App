const jwt = require("jsonwebtoken");

const generateToken = (user) => {

  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRE,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

module.exports = generateToken;
