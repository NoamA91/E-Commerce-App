const Category = require("../models/Category");
const colors = require("colors");

colors.setTheme({
    new_request: "magenta",
    success_request: "green",
    failed_request: "red",
    step_done: "blue",
});

module.exports = {
    // managers functions
    getAllCategoriesForManagers: async (req, res) => {
        console.log("API GET request - get all categories for managers".new_request);
        try {
            const categories = await Category.find().exec();

            console.log("Success to find all categories".success_request);
            return res.status(200).json({
                success: true,
                message: `Success to find all categories - for managers`,
                categories,
            });
        } catch (error) {
            console.log(`Error in get all categories - ${error}`.failed_request);
            return res.status(500).json({
                message: `Error in get all categories - for managers`,
                error: error.message,
            });
        }
    },

    getCategoryByIdForManagers: async (req, res) => {
        console.log(`API GET request - get category by ID for managers ${req.params.id}`.new_request);
        try {
            const categoryId = req.params.id;
            const category = await Category.findById(categoryId).exec();

            if (!category) {
                console.log("Category not found".failed_request);
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

            console.log("Success to find category".success_request);
            return res.status(200).json({
                success: true,
                message: `Success to find category - for managers`,
                category,
            });
        } catch (error) {
            console.log(`Error in get category by ID - ${error}`.failed_request);
            return res.status(500).json({
                message: `Error in get category by ID - for managers`,
                error: error.message,
            });
        }
    },

    addNewCategoryForManagers: async (req, res) => {
        console.log("API POST request - add new category for managers".new_request);
        try {
            const { name, animal_type } = req.body;
            const category = new Category({ name, animal_type });

            await category.save();

            console.log("Success to add new category".success_request);
            return res.status(201).json({
                success: true,
                message: `Success to add new category - for managers`,
                category,
            });
        } catch (error) {
            console.log(`Error in add new category - ${error}`.failed_request);
            return res.status(500).json({
                message: `Error in add new category - for managers`,
                error: error.message,
            });
        }
    },

    updateCategoryByIdForManagers: async (req, res) => {
        console.log("API PUT request - update category by ID for managers".new_request);
        try {
            const categoryId = req.params.id;
            const { name, animal_type } = req.body;

            const category = await Category.findByIdAndUpdate(categoryId, { name, animal_type }, { new: true }).exec();

            if (!category) {
                console.log("Category not found".failed_request);
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

            console.log("Success to update category".success_request);
            return res.status(200).json({
                success: true,
                message: `Success to update category - for managers`,
                category,
            });
        } catch (error) {
            console.log(`Error in update category by ID - ${error}`.failed_request);
            return res.status(500).json({
                message: `Error in update category by ID - for managers`,
                error: error.message,
            });
        }

    },

    deleteCategoryByIdForManagers: async (req, res) => {
        console.log("API DELETE request - delete category by ID for managers".new_request);
        try {
            const categoryId = req.params.id;

            const category = await Category.findByIdAndDelete(categoryId).exec();

            if (!category) {
                console.log("Category not found".failed_request);
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

            console.log("Success to delete category".success_request);
            return res.status(200).json({
                success: true,
                message: `Success to delete category - for managers`,
                category,
            });
        } catch (error) {
            console.log(`Error in delete category by ID - ${error}`.failed_request);
            return res.status(500).json({
                message: `Error in delete category by ID - for managers`,
                error: error.message,
            });
        }
    },
    //_______________________________________________________________

    // users functions
    getAllCategoriesForUsers: async (req, res) => {
        console.log("API GET request - get all categories for users".new_request);
        try {
            const categories = await Category.find().exec();

            console.log("Success to find all categories".success_request);
            return res.status(200).json({
                success: true,
                message: `Success to find all categories - for users`,
                categories,
            });
        } catch (error) {
            console.log(`Error in get all categories - ${error}`.failed_request);
            return res.status(500).json({
                message: `Error in get all categories - for users`,
                error: error.message,
            });
        }
    },

    getAllCategoriesForUsers: async (req, res) => {
        console.log("API GET request - get all categories for users".new_request);
        try {
            const categories = await Category.find().exec();

            console.log("Success to find all categories".success_request);
            return res.status(200).json({
                success: true,
                message: `Success to find all categories - for users`,
                categories,
            });
        } catch (error) {
            console.log(`Error in get all categories - ${error}`.failed_request);
            return res.status(500).json({
                message: `Error in get all categories - for users`,
                error: error.message,
            });
        }
    }
    //_______________________________________________________________
}