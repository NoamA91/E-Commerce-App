const jwt = require("jsonwebtoken");
const User = require("../models/User"); // import the User model

const userAuth = async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const customer_token = authHeader && authHeader.split(" ")[1];

    if (!customer_token) {
        return res.status(401).json({
            message: "Access denied. No token provided.",
        });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message: "Internal server error. JWT secret not found.",
        });
    }

    try {
        const decoded = jwt.verify(customer_token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id); // find user by id

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (!user.tokens.some(t => t.customer_token === customer_token)) { // check if token exists in tokens array
            return res.status(401).json({
                message: "Access denied. Invalid token.",
            });
        }

        req.user = user;
        req.customer_token = customer_token;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Access denied. Invalid token.",
            error: error.message,
        });
    }
};

module.exports = userAuth;
