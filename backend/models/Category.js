const mongoose = require("mongoose");
const { Schema } = mongoose;

const category_schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    animal_type: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Category", category_schema);
