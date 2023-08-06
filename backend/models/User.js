const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const validator = require("validator");

const user_schema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      minlength: [2, "Username should be longer than 2 characters"],
      maxlength: [30, "Username should be shorter than 30 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid Email address",
      },
    },
    password: {
      type: String,
      minlength: [6, "Password should be longer than 6 characters"],
      required: [true, "Password is required."],
    },
    phone_number: {
      type: String,
      validate: {
        validator: (value) => {
          if (value === "") {
            return true;
          }
          return validator.isMobilePhone(value);
        },
        message: "Phone number is invalid.",
      },
    },
    address: {
      city: {
        type: String,
        trim: true
      },
      street: {
        type: String,
        trim: true
      },
      building: {
        type: Number,
        trim: true,
        validate: {
          validator: function (value) {
            return value == null || Number.isInteger(value);
          },
          message: 'Building should be a number.',
        },
        min: 1
      },
      apartment: {
        type: Number,
        trim: true,
        validate: function (value) {
          return value == null || Number.isInteger(value);
        },
        message: 'Apartment should be a number.',
        min: 1
      }
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    tokens: [{ type: Object }]
  },
  { timestamps: true }
);

// hashing the password before saving to the database
user_schema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// comparing the password with the hashed password
user_schema.methods.comparePasswords = async function (password, hashed) {
  return await bcrypt.compare(password, hashed);
};

module.exports = mongoose.model("users", user_schema);
