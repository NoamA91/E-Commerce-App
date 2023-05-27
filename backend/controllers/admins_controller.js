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
  loginAdmin: async (req, res) => {
    console.log("Admin API POST request : admin login".new_request);
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        console.log("Email or password not provided".failed_request);
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      console.log("Email and password provided".step_done);

      const admin = await User.findOne({ email, role: "admin" });

      if (!admin) {
        console.log("Admin not found".failed_request);
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      const isMatch = await admin.comparePasswords(password, admin.password);
      if (!isMatch) {
        console.log("Invalid password".failed_request);
        return res.status(401).json({
          message: "Invalid password",
        });
      }

      const token = generateToken(admin);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      console.log("Admin login successful".success_request);
      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
      });
    } catch (error) {
      console.log(`Error in admin login - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in admin login",
        error: error.message,
      });
    }
  },

  getAllAdmins: async (req, res) => {
    console.log("API GET request : get all admins".new_request);
    try {
      const admins = await User.find({ role: "admin" });

      if (!admins || admins.length === 0) {
        console.log("No admins found".failed_request);
        return res.status(404).json({
          message: "No admins found",
          error: "There are no admins in the database",
        });
      }

      console.log("Admins retrieved".success_request);

      return res.status(200).json({
        success: true,
        message: "Admins retrieved successfully",
        admins,
      });
    } catch (error) {
      console.log(("Error in get all admins request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in get all admins request",
        error: error.message,
      });
    }
  },

  getAdminById: async (req, res) => {
    console.log("API GET request : get admin by ID".new_request);
    try {
      const adminId = req.params.id;

      if (!adminId) {
        console.log("Admin ID is required".failed_request);
        return res.status(400).json({
          message: "Admin ID is required",
        });
      }

      console.log("admin ID provided".step_done);

      const admin = await User.findById(adminId);

      if (!admin || admin.role !== "admin") {
        console.log("admin not found".failed_request);
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      console.log("admin found".success_request);

      return res.status(200).json({
        success: true,
        message: "Admin found",
        admin,
      });
    } catch (error) {
      console.log(`error in get admin by id request - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in get admin by id request",
        error: error.message,
      });
    }
  },

  addAdminForAdmin: async (req, res) => {
    console.log("API POST request : add admin".new_request);
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        console.log("Username, email or password not provided".failed_request);
        return res.status(400).json({
          message: "Username, email, and password are required",
        });
      }

      console.log("Username, email and password provided".step_done);

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        console.log("Email already exists".failed_request);
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      const newAdmin = new User({
        username,
        email,
        password,
        role: "admin",
      });

      const admin = await newAdmin.save();

      console.log("Admin added".success_request);

      return res.status(201).json({
        success: true,
        message: "Admin added successfully",
        admin,
      });
    } catch (error) {
      console.log(("Error in add admin request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in add admin request",
        error: error.message,
      });
    }
  },

  updateAdminById: async (req, res) => {
    console.log("API PUT request : update admin by id".new_request);
    try {
      const adminId = req.params.id;
      const { username, email } = req.body;

      if (!adminId) {
        console.log("Admin ID is required".failed_request);
        return res.status(400).json({
          message: "Admin ID is required",
        });
      }

      console.log("admin id provided".step_done);

      const admin = await User.findById(adminId);

      if (!admin || admin.role !== "admin") {
        console.log("admin not found".failed_request);
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      console.log("admin found".step_done);

      // Create an empty object to store the fields to update
      const updatedFields = {};

      if (username) {
        updatedFields.username = username;
      }

      if (email) {
        updatedFields.email = email;
      }

      const updatedAdmin = await User.findByIdAndUpdate(adminId, updatedFields, {
        new: true,
        runValidators: true,
      });

      console.log("admin updated".success_request);

      return res.status(200).json({
        success: true,
        message: "Admin updated",
        updatedAdmin,
      });
    } catch (error) {
      console.log(("error in update admin by id request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in update admin by id request",
        error: error.message,
      });
    }
  },

  deleteAdminById: async (req, res) => {
    console.log("API DELETE request : delete admin by id".new_request);

    try {
      const adminId = req.params.id;

      if (!adminId) {
        console.log("Admin ID is required".failed_request);
        return res.status(400).json({
          message: "Admin ID is required",
        });
      }

      console.log("admin id provided".step_done);

      const admin = await User.findById(adminId);

      if (!admin || admin.role !== "admin") {
        console.log("admin not found".failed_request);
        return res.status(404).json({
          message: "Admin not found",
        });
      }

      console.log("admin found".success_request);

      await admin.remove();

      console.log("admin deleted".success_request);

      return res.status(200).json({
        success: true,
        message: "Admin deleted",
      });
    } catch (error) {
      console.log(("error in delete admin by id request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in delete admin by id request",
        error: error.message,
      });
    }
  },

  addManagerForAdmin: async (req, res) => {
    console.log("API POST request : add manager".new_request);
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        console.log("Username, email or password not provided".failed_request);
        return res.status(400).json({
          message: "Username, email, and password are required",
        });
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

  getManagerByIdForAdmin: async (req, res) => {
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
        return res.status(404).json({
          message: "Manager not found",
          error: "Manager with the provided id does not exist",
        });
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
        return res.status(404).json({
          message: "Manager not found",
          error: "Manager with the provided id does not exist",
        });
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

      if (!managers || managers.length === 0) {
        return res.status(404).json({
          message: "No managers found",
          error: "There are no managers in the database",
        });
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
        return res.status(404).json({
          message: "User not found",
          error: "User with the provided id does not exist",
        });
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
        return res.status(404).json({
          message: "No users found",
          error: "There are no users in the database",
        });
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
