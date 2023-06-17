const User = require("../models/User");
const colors = require("colors");
const generateToken = require("../utils/generate_token");
const jwt = require("jsonwebtoken");

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
        console.log("Email or password not provided".failed_request);
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      console.log("email and password provided".step_done);

      const manager = await User.findOne({ email, role: "manager" });

      if (!manager) {
        console.log("Manager not found".failed_request);
        return res.status(404).json({
          message: "Incorrect Email or password",
        });
      }

      const isMatch = await manager.comparePasswords(password, manager.password);

      if (!isMatch) {
        console.log("Invalid password".failed_request);
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = generateToken(manager);

      // Retrieve old tokens, if any
      let oldTokens = manager.tokens || [];
      const currentTime = Date.now();

      // Filter out expired tokens
      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = currentTime - t.signedAt;
          return timeDiff <= 10800000;  // 3 hours in milliseconds
        });
      }

      // Add new token to the list
      oldTokens.push({ token, signedAt: currentTime });

      // Update the user with the new tokens array
      await User.findByIdAndUpdate(manager._id, {
        tokens: oldTokens,
      });

      console.log("Manager logged in successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "Manager logged in successfully",
        token,
        user: {
          _id: manager._id,
          username: manager.username,
          email: manager.email,
        },
      });
    } catch (error) {
      console.log(("error in login request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in login request",
        error: error.message,
      });
    }
  },

  logoutManager: async (req, res) => {
    console.log("APII POST request : logout manager".new_request);

    if (req.headers && req.headers.authorization) {

      try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
          return res
            .status(401)
            .json({ success: false, message: 'Authorization fail!' });
        }

        const tokens = req.user.tokens;

        const newTokens = tokens.filter(t => t.token !== token);

        await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });

        res.clearCookie("token");

        return res.status(200).json({
          success: true,
          message: "Manager logout successfully",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error in logout request",
          error: error.message,
        });
      }
    }
  },

  getAllManagers: async (req, res) => {
    console.log("API GET request : get all managers".new_request);
    try {
      const managers = await User.find({ role: "admin" });

      if (!managers || managers.length === 0) {
        console.log("No managers found".failed_request);
        return res.status(404).json({
          message: "No managers found",
          error: "There are no managers in the database",
        });
      }

      console.log("Managers retrieved".success_request);

      return res.status(200).json({
        success: true,
        message: "Managers retrieved successfully",
        managers,
      });
    } catch (error) {
      console.log(("Error in get all managers request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in get all managers request",
        error: error.message,
      });
    }
  },

  getManagerById: async (req, res) => {
    console.log("API GET request : get manager by id".new_request);
    try {
      const managerId = req.params.id;

      if (!managerId) {
        console.log("Manager ID is required".failed_request);
        return res.status(400).json({
          message: "Manager ID is required",
        });
      }

      console.log("manager id provided".step_done);

      const manager = await User.findById(managerId);

      if (!manager || manager.role !== "manager") {
        console.log("manager not found".failed_request);
        return res.status(404).json({
          message: "Manager not found",
        });
      }

      console.log("manager found".success_request);

      return res.status(200).json({
        success: true,
        message: "Manager found",
        manager,
      });
    } catch (error) {
      console.log(`error in get manager by id request - ${error}`.failed_request);
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
        console.log("manager not found".failed_request);
        return res.status(404).json({
          message: "Manager not found",
        });
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
        console.log("Manager ID is required".failed_request);
        return res.status(400).json({
          message: "Manager ID is required",
        });
      }

      console.log("manager id provided".step_done);

      const manager = await User.findById(managerId);

      if (!manager || manager.role !== "manager") {
        console.log("manager not found".failed_request);
        return res.status(404).json({
          message: "Manager not found",
        });
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
        console.log("manager not found".failed_request);
        return res.status(404).json({
          message: "Manager not found",
        });
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

  authManager: async (req, res) => {
    console.log("API POST request : auth token".new_request);
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          message: "Token not provided"
        })
      }

      console.log("token provided".step_done);

      const bearer = token.split(" ")[1];

      const decode = jwt.verify(bearer, process.env.JWT_SECRET);

      const manager = await User.findById(decode.id).exec();

      if (!manager || manager.role !== "manager") {
        return res.status(401).json({
          message: "Manager not found"
        })
      }

      console.log("Manager Authorized".success_request);

      return res.status(201).json({
        success: true,
        message: "Manager authoraized",
        token,
        user: {
          _id: manager._id,
          username: manager.username,
          email: manager.email,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: "Unauthoraized",
        error: error.message,
      });
    }
  },
};
