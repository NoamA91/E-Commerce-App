const User = require("../models/User");
const colors = require("colors");
const generateToken = require("../utils/generate_token");
const jwt = require("jsonwebtoken");
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
      const {
        username,
        email,
        password,
        phone_number,
        address
      } = req.body;

      // Check if all fields are provided
      if (!username || !email || !password) {
        console.log("Missing fields in the request".failed_request);
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      console.log("all fields are available".step_done);

      // Check if a user with the same email already exists
      const user = await User.findOne({ email });

      if (user) {
        console.log("user already exists".failed_request);
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Create and save the new user
      const new_user = new User({
        username,
        email,
        password,
        phone_number: phone_number || "",
        address
      });

      await new_user.save();

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
        console.log("Email or password not provided".failed_request);
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      console.log("email and password provided".step_done);

      const user = await User.findOne({ email });

      if (!user) {
        console.log("User not found".failed_request);
        return res.status(404).json({
          message: "Incorrect Email or password",
        });
      }

      const isMatch = await user.comparePasswords(password, user.password);

      if (!isMatch) {
        console.log("Invalid password".failed_request);
        return res.status(401).json({
          message: "Incorrect Email or password",
        });
      }

      const customer_token = generateToken(user);

      // Retrieve old tokens, if any
      let oldTokens = user.tokens || [];
      const currentTime = Date.now();

      // Filter out expired tokens
      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (currentTime - parseInt(t.signedAt)) / 1000;
          if (timeDiff <= 10800000) {
            return t;
          }
        });
      }

      // Add new token to the list
      oldTokens.push({ customer_token, signedAt: currentTime.toString() });

      // Update the user with the new tokens array
      await User.findByIdAndUpdate(user._id, {
        tokens: oldTokens,
      });

      console.log("User logged in successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        customer_token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
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

  logoutUser: async (req, res) => {
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
          message: "User logout successfully",
        });
      } catch (error) {
        return res.status(500).json({
          message: "Error in logout request",
          error: error.message,
        });
      }
    }
  },

  getAll: async (req, res) => {
    console.log("API GET request : get all Users".new_request);

    try {
      const users = await User.find();

      if (!users.length) {
        console.log("No users found".step_done);
        return res.status(200).json({
          success: true,
          message: "No users found",
          users: [],
        });
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
    console.log(`API GET request : get User by ID ${req.params.id}`.new_request);

    try {
      const userId = req.params.id;

      if (!userId) {
        throw new Error("User ID is required");
      }

      console.log("User ID is available".step_done);

      const user = await User.findById(userId);

      if (!user) {
        console.log("User not found".failed_request);
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log("User found".success_request);

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        user,
      });
    } catch (error) {
      console.log(("error in get user by ID request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in get user by ID request",
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    console.log(`API PUT request : update user ${req.params.id}`.new_request);

    try {
      const userId = req.params.id;
      const { username, email } = req.body;

      console.log("Updating fields are available".step_done);

      const updatedFields = {};

      if (username) {
        updatedFields.username = username;
      }

      if (email) {
        updatedFields.email = email;
      }

      const user = await User.findOneAndUpdate({ _id: userId }, updatedFields, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        console.log(`User with ID ${userId} not found`.failed_request);
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log(`User with ID ${userId} updated successfully`.success_request);

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
    console.log(`API DELETE request : delete User ${req.params.id}`.new_request);

    try {
      const userId = req.params.id;

      if (!userId) {
        console.log("Missing user ID".failed_request);
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      console.log("user ID provided".step_done);

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        console.log("User not found".failed_request);
        return res.status(404).json({
          message: "User not found",
        });
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

      if (!userId) {
        throw new Error("User ID is required");
      }

      console.log("user id provided".step_done);

      if (!newPassword || !oldPassword) {
        throw new Error("New and old password are required");
      }

      console.log("new and old password provided".step_done);

      if (oldPassword === newPassword) {
        throw new Error("New password cannot be the same as the old password");
      }

      console.log("New password is different from old password".step_done);

      const user = await User.findById(userId);

      if (!user) {
        console.log("User not found".failed_request);
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log("user found".step_done);

      // Check if the old password is correct
      const isMatch = await user.comparePasswords(oldPassword, user.password);

      if (!isMatch) {
        throw new Error("Incorrect old password");
      }

      console.log("old password is correct".step_done);

      // Set the new password and save the user
      user.password = newPassword;
      await user.save();

      console.log("New password set and saved".success_request);

      return res.status(200).json({
        success: true,
        message: "New password set and saved",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error in change password",
        error: error.message,
      });
    }
  },

  authUser: async (req, res) => {
    console.log("API POST request : auth token".new_request);
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        return res.status(401).json({
          message: "Authorization header not provided"
        })
      }

      console.log("Authorization header provided".step_done);

      const customer_token = authorization.split(" ")[1];

      if (!customer_token) {
        return res.status(401).json({
          message: "Token not provided"
        })
      }

      const decode = jwt.verify(customer_token, process.env.JWT_SECRET);

      const user = await User.findById(
        decode.id,
        "-password -tokens"
      ).exec();

      if (!user) {
        return res.status(401).json({
          message: "User not found"
        })
      }

      console.log("User Authorized".success_request);

      return res.status(201).json({
        success: true,
        message: "User authoraized",
        customer_token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      return res.status(401).json({
        message: "Unauthoraized",
        error: error.message,
      });
    }
  },

  // managers requests
  getAllUsersForManager: async (req, res) => {
    console.log("API GET request : get all users - For managers".new_request);

    try {
      const users = await User.find();

      if (!users.length) {
        console.log("No users found".step_done);
        return res.status(200).json({
          success: true,
          message: "No users found",
          users: [],
        });
      }

      console.log("All users retrieved successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "Customers retrieved successfully - for managers",
        users,
      });
    } catch (error) {
      console.log(("error in getAll users request : " + error).failed_request);
      return res.status(500).json({
        message: "Error in get all customers request - for managers",
        error: error.message,
      });
    }
  },

  getUserByIdForManager: async (req, res) => {
    console.log(`API GET request : get user by ID ${req.params.id} - for manager`.new_request);

    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      console.log("User ID is available".step_done);

      const user = await User.findById(userId);

      if (!user) {
        console.log("User not found".failed_request);
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log("User found".success_request);

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully - for managers",
        user,
      });
    } catch (error) {
      console.log(("error in get user by ID request: " + error).failed_request);
      return res.status(500).json({
        message: "Error in get user by ID request - for managers",
        error: error.message,
      });
    }
  },

  updateUserByIdForManager: async (req, res) => {
    console.log(`API PUT request : update user ${req.params.id} - for manager`.new_request);

    try {
      const userId = req.params.id;
      const { username, email, phone_number, address } = req.body;

      console.log("Updating fields are available".step_done);

      const updatedFields = {};

      if (username !== undefined) {
        updatedFields.username = username;
      }

      if (email !== undefined) {
        updatedFields.email = email;
      }

      if (phone_number !== undefined) {
        updatedFields.phone_number = phone_number;
      }

      if (address !== undefined) {
        updatedFields.address = address;
      }

      const user = await User.findOneAndUpdate({ _id: userId }, updatedFields, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        console.log(`User with ID ${userId} not found`.failed_request);
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log(`User with ID ${userId} updated successfully`.success_request);

      return res.status(200).json({
        success: true,
        message: "User updated successfully - for managers",
      });
    } catch (error) {
      console.log(("Error in update request: " + error).failed_request);
      return res.status(500).json({
        message: "Error in update user request - for managers",
        error: error.message,
      });
    }
  },

  addUserForManager: async (req, res) => {
    console.log("API POST request : add user - For managers".new_request);

    try {
      const {
        username,
        email,
        password,
        password_confirm,
        phone_number,
        address
      } = req.body;

      // Check if all fields are provided
      if (!username || !email || !password || !password_confirm) {
        return res.status(400).json({
          message: "All fields are required",
        })
      }

      console.log("all fields are provided".step_done);

      // Check if passwords match
      if (password !== password_confirm) {
        console.log("passwords are match".failed_request);
        return res.status(400).json({
          message: "Passwords do not match",
        })
      }

      console.log("passwords are match".step_done);

      // Check if a user with the same email already exists
      const user = await User.findOne({ email });

      if (user) {
        console.log("User with the same email already exists".failed_request);
        return res.status(400).json({
          message: "User with the same email already exists",
        });
      }

      // Create and save the new user
      const new_user = new User({
        username,
        email,
        password,
        phone_number,
        address
      });

      await new_user.save();

      console.log("user added successfully - by manager".success_request);

      return res.status(200).json({
        success: true,
        message: "User added successfully - for managers",
        new_user
      });
    } catch (error) {
      console.log(("error in add user request - for managers : " + error).failed_request);
      return res.status(500).json({
        message: "Error in add user request - for managers",
        error: error.message,
      });
    }
  },

  deleteUserByIdForManager: async (req, res) => {
    console.log(`API DELETE request : delete user ${req.params.id} - for manager`.new_request);

    try {
      const userId = req.params.id;

      if (!userId) {
        return res.status(400).json({
          message: "User ID is required",
        });
      }

      console.log("User ID is available".step_done);

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        console.log("User not found".failed_request);
        return res.status(404).json({
          message: "User not found",
        });
      }

      console.log("User deleted successfully".success_request);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully - for managers",
      });
    } catch (error) {
      console.log(("error in delete user request - for managers : " + error).failed_request);
      return res.status(500).json({
        message: "Error in delete user request - for managers",
        error: error.message,
      });
    }
  },
  //_________________________________________________________________________________
}
