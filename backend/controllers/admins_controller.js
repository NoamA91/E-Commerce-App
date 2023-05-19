const User = require("../models/User");
const colors = require("colors");
const generateToken = require("../utils/generate_token");

colors.setTheme({
  new_request: "magenta",
  success_request: "green",
  failed_request: "red",
  step_done: "blue",
});

module.exports = {};
