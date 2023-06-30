const mongoose = require("mongoose");
const { Schema } = mongoose;

const product_schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    image: [
      {
        type: String,
        required: [true, "Image is required."],
        match: [/\.(jpg|jpeg|png)$/i, "must be a valid image link"],
      },
    ],
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, "Category is required."],
    },
    count_in_stock: {
      type: Number,
      required: [true, "Please provide count in stock."],
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", product_schema);
