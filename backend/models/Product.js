const mongoose = require('mongoose');
const { Schema } = mongoose;

const product_schema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title.'],
        trim: true
    },
    image: [
        {
            type: String,
            required: [true, 'Please provide an image.'],
        }
    ],
    description: {
        type: String,
        required: [true, 'Please provide a description.'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price.'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Please provide a category.'],
    },
    count_in_stock: {
        type: Number,
        required: [true, 'Please provide count in stock.'],
        default: 0,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('products', product_schema);
