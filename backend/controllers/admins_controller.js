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
  addManagerForAdmin: async (req, res) => {
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
  updateManagerByIdForAdmin: async (req, res) => {
    console.log("API PUT request : update manager by id".new_request);
    try {
      const managerId = req.params.id;
      const { username, email } = req.body;

      if (!managerId) {
        throw new Error("Manager id is required");
      }

      console.log("manager id provided".step_done);

      const manager = await User.findById(managerId);

      if (!manager || manager.role !== "manager") {
        throw new Error("Manager not found");
      }

      console.log("manager found".success_request);

      // Create an empty object to store the fields to update
      const updatedFields = {};

      if (username) {
        updatedFields.username = username;
      }

      if (email) {
        updatedFields.email = email;
      }

      const updatedManager = await User.findByIdAndUpdate(managerId, updatedFields, {
        new: true,
        runValidators: true,
      });

      console.log("manager updated".success_request);

      return res.status(200).json({
        success: true,
        message: "Manager updated",
        updatedManager,
      });
    } catch (error) {
      console.log(("error in update manager by id request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in update manager by id request",
        error: error.message,
      });
    }
  },
  deleteManagerByIdForAdmin: async (req, res) => {
    /* code here */
  },
  getAllManagersForAdmin: async (req, res) => {
    /* code here */
  },

  addUserForAdmin: async (req, res) => {
    /* code here */
  },
  updateUserByIdForAdmin: async (req, res) => {
    /* code here */
  },
  deleteUserByIdForAdmin: async (req, res) => {
    /* code here */
  },
  getAllUsersForAdmin: async (req, res) => {
    /* code here */
  },
};
