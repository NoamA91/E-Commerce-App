const mongoose = require('mongoose');
const { Schema } = mongoose;

const order_schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    order_items: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            item_total: {
                type: Number,
                required: true
            },
        }
    ],
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: [true, 'Please provide a phone number.'],
        match: [
            /^[0-9]{9}$/,
            'Please provide a valid phone number.'
        ]
    },
    payment_method: {
        type: String,
        required: true,
        default: 'Paypal'
    },
    status: {
        type: String,
        default: 'pending'
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    shipping_fee: {
        type: Number,
        required: true,
        min: 0
    },
    order_total: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('orders', order_schema);