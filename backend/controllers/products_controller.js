const Product = require('../models/product');
const colors = require("colors");

colors.setTheme({
    new_request: "magenta",
    success_request: "green",
    failed_request: "red",
    step_done: "blue",
});

module.exports = {

    getAll: async (req, res) => {
        console.log("API GET request : All products".new_request);

        try {
            const products = await Product.find({});

            console.log("Success to get all products".step_done);

            res.status(200).json({
                success: true,
                products
            });

        } catch (error) {
            console.log("Error in get all products request".failed_request, error);
            res.status(500).json({
                message: 'Error in get all products request',
                error: error.message
            });
        }
    },

    addProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const product = await newProduct.save();
            console.log("Create product".step_done);
            res.status(201).json(product);
        } catch (error) {
            console.log("Create product error".failed_request, error);
            res.status(500).json({ error: 'Error creating product' });
        }
    },

    getById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            console.log("Get product".step_done);
            res.status(200).json(product);
        } catch (error) {
            console.log("Get product error".failed_request, error);
            res.status(500).json({ error: 'Error getting product' });
        }
    },

    updateById: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            console.log("Update product".step_done);
            res.status(200).json(product);
        } catch (error) {
            console.log("Update product error".failed_request, error);
            res.status(500).json({ error: 'Error updating product' });
        }
    },

}