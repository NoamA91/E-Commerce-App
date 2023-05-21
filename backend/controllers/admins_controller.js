const User = require("../models/User");
const colors = require("colors");

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

      await User.findByIdAndDelete(managerId);

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
  getAllManagersForAdmin: async (req, res) => {
    console.log("API GET request : get all managers".new_request);
    try {
      const managers = await User.find({ role: "manager" });

      if (!managers) {
        throw new Error("No managers found");
      }

      console.log("managers found".success_request);

      return res.status(200).json({
        success: true,
        message: "Managers retrieved successfully",
        managers,
      });
    } catch (error) {
      console.log(("error in get all managers request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in get all managers request",
        error: error.message,
      });
    }
  },

  addUserForAdmin: async (req, res) => {
    console.log("API POST request : add user".new_request);
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
        role: "user",
      });

      const user = await newUser.save();

      console.log("User added".success_request);

      return res.status(201).json({
        success: true,
        message: "User added successfully",
        user,
      });
    } catch (error) {
      console.log(("error in add user request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in add user request",
        error: error.message,
      });
    }
  },
  updateUserByIdForAdmin: async (req, res) => {
    console.log("API PUT request : update user by id".new_request);
    try {
      const userId = req.params.id;
      const { username, email } = req.body;

      if (!userId) {
        throw new Error("User id is required");
      }

      console.log("user id provided".step_done);

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      console.log("user found".step_done);

      const updatedFields = {};

      if (username) {
        updatedFields.username = username;
      }

      if (email) {
        updatedFields.email = email;
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
        new: true,
        runValidators: true,
      });

      console.log("user updated".success_request);

      return res.status(200).json({
        success: true,
        message: "User updated",
        updatedUser,
      });
    } catch (error) {
      console.log(("error in update user by id request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in update user by id request",
        error: error.message,
      });
    }
  },
  deleteUserByIdForAdmin: async (req, res) => {
    console.log("API DELETE request : delete user by id".new_request);
    try {
      const userId = req.params.id;

      if (!userId) {
        throw new Error("User id is required");
      }

      console.log("user id provided".step_done);

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      console.log("user found".step_done);

      await User.findByIdAndDelete(userId);

      console.log("user deleted".success_request);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(("error in delete user by id request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in delete user by id request",
        error: error.message,
      });
    }
  },
  getAllUsersForAdmin: async (req, res) => {
    console.log("API GET request : get all users".new_request);
    try {
      const users = await User.find({});

      if (!users || users.length === 0) {
        throw new Error("No users found");
      }

      console.log("Users retrieved".success_request);

      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        users,
      });
    } catch (error) {
      console.log(("error in get all users request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in get all users request",
        error: error.message,
      });
    }
  },
};
