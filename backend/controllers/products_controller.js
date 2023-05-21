const Product = require("../models/Product");
const colors = require("colors");

colors.setTheme({
  new_request: "magenta",
  success_request: "green",
  failed_request: "red",
  step_done: "blue",
});

module.exports = {
  getAll: async (req, res) => {
    console.log("API GET request : get all products".new_request);
    try {
      const products = await Product.find();

      if (!products.length) {
        console.log("no products found".step_done);
        return res.status(200).json({
          success: true,
          message: "No products found",
          products,
        });
      }

      console.log("Products found".step_done);
      return res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        products: products,
      });
    } catch (error) {
      console.log(("error to get all products" + error).failed_request);
      return res.status(500).json({
        error: "Error in get all products",
      });
    }
  },

  addProduct: async (req, res) => {
    console.log("API POST request : Add product".new_request);
    try {
      const { title, image, description, price, category, count_in_stock } = req.body;

      if (!title || !image || !description || !price || !category || !count_in_stock) {
        console.log("missing product fields in request".failed_request);
        return res.status(400).json({
          message: "Missing fields",
        });
      }

      console.log("all product fields provided".step_done);

      const newProduct = new Product({
        title,
        image,
        description,
        price,
        category,
        count_in_stock,
      });

      await newProduct.save();

      console.log("product created successfully".success_request);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.log(("Error creating product" + error).failed_request);
      res.status(500).json({
        message: "Error creating product",
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    console.log(`API GET request : Get product by ID ${req.params.id}`.new_request);
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        console.log(`Product with ID ${req.params.id} not found`.failed_request);
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      console.log("Product found".step_done);
      return res.status(200).json({
        success: true,
        product: product,
      });
    } catch (error) {
      console.log(("Error in getting product by id" + error).failed_request);
      return res.status(500).json({
        error: "Error getting product by id",
      });
    }
  },

  updateById: async (req, res) => {},

  deleteById: async (req, res) => {},
};
