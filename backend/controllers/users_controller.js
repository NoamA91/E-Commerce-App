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
  updateById: async (req, res) => {
    console.log("API PUT request : update User".new_request);

    // try {
    //   const { username, email } = req.body;

    //   if (!username && !email) {
    //     throw new Error("At least one of username or email is required");
    //   }

    //   console.log("At least one of username or email is available".step_done);

    //   const updateFields = {};
    //   if (username) updateFields.username = username;
    //   if (email) updateFields.email = email;

    //   const updatedUser = await User.findByIdAndUpdate(
    //     req.user.id,
    //     updateFields,
    //     { new: true, runValidators: true }
    //   );

    //   if (!updatedUser) {
    //     throw new Error("User not found");
    //   }

    //   console.log("User updated successfully".success_request);

    //   return res.status(200).json({
    //     success: true,
    //     message: "User updated successfully",
    //     user: {
    //       id: updatedUser.id,
    //       username: updatedUser.username,
    //       email: updatedUser.email,
    //       role: updatedUser.role,
    //     },
    //   });
    // } catch (error) {
    //   console.log(("Error in update request : " + error).failed_request);
    //   return res.status(500).json({
    //     message: "Error in update request",
    //     error: error.message,
    //   });
    // }
  },
  getById: async (req, res) => {},
  forgotPassword: async (req, res) => {},
  resetPassword: async (req, res) => {},
  getAllUsers: async (req, res) => {},
  deleteById: async (req, res) => {},
  changePassword: async (req, res) => {},
};
