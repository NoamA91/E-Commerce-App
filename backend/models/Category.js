const mongoose = require("mongoose");
const { Schema } = mongoose;

const category_schema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        validate: {
            validator: function(value) {
                return typeof value === 'string' && value.trim().length > 0 && isNaN(value);
            },
            message: "Name should be a non-empty string and not a number"
        }
    },
    animal_type: {
        type: String,
        required: [true, "Animal type is required"],
        validate: {
            validator: function(value) {
                return typeof value === 'string' && value.trim().length > 0 && isNaN(value);
            },
            message: "Animal type should be a non-empty string and not a number"
        }
    }
});

//The code below is used to ensure that the combination of "name" and "animal_type" fields are unique.
category_schema.index({ name: 1, animal_type: 1 }, { unique: true });

module.exports = mongoose.model("Category", category_schema);
