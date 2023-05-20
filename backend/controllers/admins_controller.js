const User = require("../models/User");
const colors = require("colors");
const generateToken = require("../utils/generate_token");

colors.setTheme({
  new_request: "magenta",
  success_request: "green",
  failed_request: "red",
  step_done: "blue",
});

module.exports = {
  addManager: async (req, res) => {
    console.log("API POST request : add manager".new_request);
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        throw new Error("Username, email and password are required");
      }

      console.log("username, email and password provided".step_done);

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("Email already exists");
      }

      const newUser = new User({
        username,
        email,
        password,
        role: "manager",
      });

      const manager = await newUser.save();

      console.log("manager added".success_request);

      return res.status(201).json({
        success: true,
        message: "Manager added",
        manager,
      });
    } catch (error) {
      console.log(("error in add manager request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in add manager request",
        error: error.message,
      });
    }
  },
};
