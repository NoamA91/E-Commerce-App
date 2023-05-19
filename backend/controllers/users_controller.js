const User = require("../models/User");
const colors = require("colors");
const generateToken = require("../utils/generate_token");
// const nodemailer = require("nodemailer");

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

      console.log("email and password provided".step_done);

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

      console.log("Users found".step_done);
      if (!users) {
        throw new Error("No users found");
      }
      console.log("All users retrieved successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        users,
      });
    } catch (error) {
      console.log(("error in getAll users request : " + error).failed_request);
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
      const userId = req.params.id;
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
      });
    } catch (error) {
      console.log(("Error in update request: " + error).failed_request);
      return res.status(500).json({
        message: "Error in update request",
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    console.log("API DELETE request : delete User".new_request);

    try {
      const userId = req.params.id;

      if (!userId) {
        throw new Error("User ID is required");
      }

      console.log("user ID provided".step_done);

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        throw new Error("User not found");
      }

      console.log("user deleted successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.log(("error in delete request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in delete request",
        error: error.message,
      });
    }
  },

  /*   forgotPassword: async (req, res) => {
      // (Note: transporter is the nodemailer transporter object you would have set up with your SMTP credentials.)
      //   Remember to replace process.env.CLIENT_URL, process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD and process.env.JWT_SECRET with your actual values either directly or from your environment variables.
  
      //   1. process.env.CLIENT_URL: This should be the base URL of your frontend client. For example, if your website is https://mywebsite.com, then CLIENT_URL would be 'https://mywebsite.com'.
  
      //   2. process.env.EMAIL_USERNAME: This should be the email address you are using to send emails. If you're using Gmail, for example, this would be your full Gmail address.
  
      //   3. process.env.EMAIL_PASSWORD: This is the password for the email account you're using to send emails. If you're using Gmail, this would be your Gmail password.
  
      //   4. process.env.JWT_SECRET: This is a secret string used to sign and verify JSON Web Tokens. This can be any string, but it should be complex and hard to guess. It's used for cryptographic operations, so don't use something simple like 'secret'.
     
  
      console.log("API POST request : forgot password".new_request);
  
      const { email } = req.body;
      try {
        const user = await User.findOne({ email });
  
        console.log("Email is available".step_done);
  
        if (!user) {
          throw new Error("User not found");
        }
  
        const token = jwt.sign(
          { _id: user._id, purpose: "resetPassword" },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
  
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
  
        const mailOptions = {
          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: "Password Reset Link",
          html: `<h2>Please click on the given link to reset your password</h2>
                     <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`,
        };
  
        await transporter.sendEmail(mailOptions);
  
        return res.status(200).json({
          success: true,
          message: `A reset email has been sent to ${email}`,
        });
      } catch (error) {
        ("error in forgot password request : " + error).failed_request;
        return res.status(500).json({
          message: "Error in forgot password.",
          error: error.message,
        });
      }
    },
  
    resetPassword: async (req, res) => {
      // This function is used when the user clicks the password reset link they received in their email. In this function, you would:
      // - Verify the reset token in the request.
      // - Check if the token is still valid (not expired).
      // - Allow the user to set a new password, and save the updated password in the database.
      // - Invalidate the reset token to ensure it cannot be used again.
  
      const { token, newPassword } = req.body;
  
      try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        if (!decoded || decoded.purpose != "resetPassword") {
          throw new Error("Invalid or expired reset token");
        }
  
        // Find the user associated with the reset token
        const user = await User.findOne({ _id: decoded._id });
  
        if (!user) {
          throw new Error("Invalid or expired reset token");
        }
  
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
  
        // Set the new password and save the user
        user.password = hashedPassword;
        await user.save();
  
        return res.status(200).json({
          success: true,
          message: "Password reset successfully",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error in reset password",
          error: error.message,
        });
      }
    },
   */
  changePassword: async (req, res) => {
    console.log("API POST request : change password".new_request);

    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.params.id;

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      console.log("user found".step_done);

      if (!oldPassword || !newPassword) {
        throw new Error("Old and new password are required");
      }

      console.log("old and new password provided".step_done);

      // Check if the old password is correct
      const isMatch = await user.comparePasswords(oldPassword, user.password);

      if (!isMatch) {
        throw new Error("Incorrect old password");
      }

      console.log("Old password is correct".step_done);

      // Set the new password and save the user
      user.password = newPassword;
      await user.save();

      console.log("New password set and saved".success_request);

      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error in change password",
        error: error.message,
      });
    }
  },
};
