const mongoose = require("mongoose");
const { Schema } = mongoose;

const category_schema = new Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        trim: true
    },
    animal_type: {
        type: String,
        required: [true, "Animal type is required"],
    }
});

//The code creates a unique index on the "name" and "animal_type" fields in the "category_schema" collection, ensuring that each combination of a name and animal type is unique.
category_schema.index({ name: 1, animal_type: 1 }, { unique: true });

module.exports = mongoose.model("Category", category_schema);
