const User = require('../models/User');
const bcrypt = require('bcrypt');
const colors = require('colors');
const jwt = require('jsonwebtoken');

colors.setTheme({
    new_request: 'magenta',
    success_request: 'green',
    failed_request: 'red',
    step_done: 'blue'
});

module.exports = {
    registerUser: async (req, res) => {

        console.log("API request : POST register User".new_request);

        try {

            const {
                username,
                email,
                password,
                password_confirm,
                permission
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
                permission
            });

            await new_user.save();

            console.log("user registered successfully".success_request);

            return res.status(200).json({
                success: true,
                message: 'User registered successfully'
            })

        } catch (error) {
            console.log(("error in register request : " + error).failed_request);
            return res.status(500).json({
                message: 'Error in register request',
                error: error.message
            });
        }
    }
}