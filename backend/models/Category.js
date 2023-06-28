const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");

const category_schema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true,
        validate: {
            validator: (value) => {
                return validator.isAlpha(value) && value.trim().length > 0 && isNaN(value);
            },  
        }
    },
    animal_type: {
        type: String,
        required: [true, "Animal type is required"],
        validate: {
            validator: (value) => {
                return validator.isAlpha(value) && value.trim().length > 0 && isNaN(value);
            },
        }
    }
});

//The code below is used to ensure that the combination of "name" and "animal_type" fields are unique.
category_schema.index({ name: 1, animal_type: 1 }, { unique: true });

module.exports = mongoose.model("Category", category_schema);
