const User = require('../models/User');
const colors = require('colors');
const generateToken = require('../utils/generate_token');

colors.setTheme({
    new_request: 'magenta',
    success_request: 'green',
    failed_request: 'red',
    step_done: 'blue'
});


module.exports = {
    registerUser: async (req, res) => {
        console.log("API POST request : register User".new_request);

        try {
            const {
                username,
                email,
                password,
                password_confirm,
                role
            } = req.body;

            if (!username || !email || !password || !password_confirm) {
                throw new Error('All fields are required');
            }

            console.log("all fields are available".step_done);

            if (password !== password_confirm) {
                throw new Error('Passwords are not match');
            };

            console.log("passwords are match".step_done);

            const user = await User.findOne({ email });

            if (user) {
                throw new Error('User already exists');
            }

            const new_user = new User({
                username,
                email,
                password,
                role
            });

            await new_user.save();

            const token = generateToken(new_user);

            console.log("user registered successfully".success_request);

            return res.status(200).json({
                success: true,
                message: 'User registered successfully',
                token
            })

        } catch (error) {
            console.log(("error in register request : " + error).failed_request);
            return res.status(500).json({
                message: 'Error in register request',
                error: error.message
            });
        }
    },

    loginUser: async (req, res) => {
        console.log("API POST request : login User".new_request);

        try {
            const {
                email,
                password
            } = req.body;

            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            console.log("email and password are available".step_done);

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await user.comparePasswords(password, user.password);

            if (!isMatch) {
                throw new Error('Invalid email or password');
            }

            const token = generateToken(user);

            console.log("user logged in successfully".success_request);

            return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token
            });
        } catch (error) {
            console.log(("error in login request : " + error).failed_request);
            return res.status(500).json({
                message: 'Error in login request',
                error: error.message
            });
        }
    },
    updateById: async (req, res) => { },
    getById: async (req, res) => { },
    forgotPassword: async (req, res) => { },
    resetPassword: async (req, res) => { },
    getAllUsers: async (req, res) => { },
    deleteById: async (req, res) => { },
    changePassword: async (req, res) => { },
}

