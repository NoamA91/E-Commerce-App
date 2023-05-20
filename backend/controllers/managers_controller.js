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
  loginManager: async (req, res) => {
    console.log("API POST request : login manager".new_request);

    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      console.log("email and password provided".step_done);

      const manager = await User.findOne({ email, role: "manager" });

      if (!manager) {
        throw new Error("Manager not found");
      }

      const isMatch = await manager.comparePasswords(password, manager.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken(manager);

      // Set the token in a cookie
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      console.log("user logged in successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
      });
    } catch (error) {
      console.log(("error in login request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in login request",
        error: error.message,
      });
    }
  },

  getManagerById: async (req, res) => {
    console.log("API GET request : get manager by id".new_request);
    try {
      const managerId = req.params.id;

      if (!managerId) {
        throw new Error("Manager id is required");
      }

      console.log("manager id provided".step_done);

      const manager = await User.findById(managerId);

      if (!manager || manager.role !== "manager") {
        throw new Error("Manager not found");
      }

      console.log("manager found".success_request);

      return res.status(200).json({
        success: true,
        message: "Manager found",
        manager,
      });
    } catch (error) {
      console.log(("error in get manager by id request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in get manager by id request",
        error: error.message,
      });
    }
  },

  updateManagerById: async (req, res) => {
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

      console.log("manager found".step_done);

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

  deleteManagerById: async (req, res) => {
    console.log("API DELETE request : delete manager by id".new_request);

    try {
      const managerId = req.params.id;

      if (!managerId) {
        throw new Error("Manager id is required");
      }

      console.log("manager id provided".step_done);

      const manager = await User.findById(managerId);

      if (!manager || manager.role !== "manager") {
        throw new Error("Manager not found");
      }

      console.log("manager found".success_request);

      await manager.remove();

      console.log("manager deleted".success_request);

      return res.status(200).json({
        success: true,
        message: "Manager deleted",
      });
    } catch (error) {
      console.log(("error in delete manager by id request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in delete manager by id request",
        error: error.message,
      });
    }
  },

  changeManagerPassword: async (req, res) => {
    console.log("API PUT request : change manager password".new_request);

    try {
      const { oldPassword, newPassword } = req.body;
      const managerId = req.params.id;

      if (!managerId) {
        throw new Error("User ID is required");
      }

      console.log("manager id provided".step_done);

      if (!newPassword || !oldPassword) {
        throw new Error("New and old password are required");
      }

      console.log("new and old password provided".step_done);

      if (oldPassword === newPassword) {
        throw new Error("New password cannot be the same as the old password");
      }

      console.log("new password is different from old password".step_done);

      const manager = await User.findById(managerId);

      if (!manager || manager.role !== "manager") {
        throw new Error("Manager not found");
      }

      console.log("manager found".success_request);

      const isMatch = await manager.comparePasswords(oldPassword, manager.password);

      if (!isMatch) {
        throw new Error("Incorrect old password");
      }

      console.log("Old password is correct".step_done);

      manager.password = newPassword;
      await manager.save();

      console.log("New password set and saved".success_request);
      return res.status(200).json({
        success: true,
        message: "New password set and saved",
      });
    } catch (error) {
      console.log(("error in change manager password request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in change manager password request",
        error: error.message,
      });
    }
  },
};
