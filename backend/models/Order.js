const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const order_schema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    order_items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        item_total: {
          type: Number,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: [true, "Please provide a phone number."],
      validate: {
        validator: (value) => validator.isMobilePhone(value),
        message: "Phone number is invalid.",
      },
    },
    payment_method: {
      type: String,
      required: true,
      default: "Paypal",
    },
    status: {
      type: String,
      default: "pending",
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    shipping_fee: {
      type: Number,
      required: true,
      min: 0,
    },
    order_total: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

order_schema.pre("save", function (next) {
  // Calculate the total price for each item
  this.order_items = this.order_items.map((item) => {
    item.item_total = item.quantity * item.price;
    return item;
  });

  // Calculate the total price for all items in the order
  this.order_total = this.order_items.reduce((total, item) => {
    return total + item.item_total;
  }, 0);

  next();
});

module.exports = mongoose.model("orders", order_schema);
