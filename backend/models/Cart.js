const mongoose = require('mongoose');
const { Schema } = mongoose;

const cart_schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: [true, 'Please provide user ID.'],
    },
    cart_items: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'products'

            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('carts', cart_schema);
