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
  registerUser: async (req, res) => {
    console.log("API POST request : register User".new_request);

    try {
      const { username, email, password, password_confirm, role } = req.body;

      // Check if all fields are provided
      if (!username || !email || !password || !password_confirm) {
        throw new Error("All fields are required");
      }

      console.log("all fields are available".step_done);

      // Check if passwords match
      if (password !== password_confirm) {
        throw new Error("Passwords are not match");
      }

      console.log("passwords are match".step_done);

      // Check if a user with the same email already exists
      const user = await User.findOne({ email });

      if (user) {
        throw new Error("User already exists");
      }

      // Create and save the new user
      const new_user = new User({
        username,
        email,
        password,
        role,
      });

      await new_user.save();

      // Generate a token for the new user
      const token = generateToken(new_user);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      console.log("user registered successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(("error in register request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in register request",
        error: error.message,
      });
    }
  },

  loginUser: async (req, res) => {
    console.log("API POST request : login User".new_request);

    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      console.log("email and password are available".step_done);

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await user.comparePasswords(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid email or password");
      }

      const token = generateToken(user);

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

  getAll: async (req, res) => {
    console.log("API GET request : get all Users".new_request);
    try {
      const users = await User.find();

      if (!users) {
        throw new Error("No users found");
      }

      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        users,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error in get all users request",
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    console.log("API GET request : get User by ID".new_request);

    try {
      const userId = req.params.id;

      if (!userId) {
        throw new Error("User ID is required");
      }

      console.log("User ID is available".step_done);

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      console.log("User found".success_request);

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        user,
      });
    } catch (error) {
      console.log(
        ("error in get user by ID request : " + error).failed_request
      );
      return res.status(500).json({
        message: "Error in get user by ID request",
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    console.log("API PUT request : update User".new_request);

    try {
      const userId = req.user.id;
      const { username, email } = req.body;

      console.log("Updating fields are available".step_done);

      // Create an empty object to store the fields to update
      const updatedFields = {};

      if (username) {
        updatedFields.username = username;
      }

      if (email) {
        updatedFields.email = email;
      }

      const user = await User.findOneAndUpdate({ _id: userId }, updatedFields, {
        new: true,
      });

      if (!user) {
        throw new Error("User not found");
      }

      console.log("User updated successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      console.log(("Error in update request: " + error).failed_request);
      return res.status(500).json({
        message: "Error in update request",
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {},

  forgotPassword: async (req, res) => {
    /*This function is typically used when a user forgets their password and requests a password reset. In this function, you would usually:
    - Check if the provided email exists in your database.
    - Generate a unique reset token and save it with an expiration time.
    - Send an email to the user with a password reset link containing the token. */
  },

  resetPassword: async (req, res) => {
    /*This function is used when the user clicks the password reset link they received in their email. In this function, you would:
    - Verify the reset token in the request.
    - Check if the token is still valid (not expired).
    - Allow the user to set a new password, and save the updated password in the database.
    - Invalidate the reset token to ensure it cannot be used again. */
  },

  changePassword: async (req, res) => {},
};
