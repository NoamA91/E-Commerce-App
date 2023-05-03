const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const validator = require('validator');


const user_schema = new Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required.'],
        minlength: [2, "First name must have minimum 2 characters"],
        maxlength: [30, "First name should be shorter than 30 characters"]
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required.'],
        minlength: [2, "Last name must have minimum 2 characters"],
        maxlength: [30, "Last name should be shorter than 30 characters"]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Invalid Email address',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    permission: {
        type: Number,
        default: 3,
        enum: [1, 2, 3] // 1: Super Admin, 2: Admin, 3: Regular User
    }
}, { timestamps: true });


// hashing the password before saving to the database
user_schema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

// comparing the password with the hashed password
user_schema.methods.comparePassword = async function (password, hashed) {
    return await bcrypt.compare(password, hashed);
}


module.exports = mongoose.model('users', user_schema);