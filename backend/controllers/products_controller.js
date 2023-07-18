const Product = require("../models/Product");
const Category = require("../models/Category");
const colors = require("colors");
const path = require('path');
const fs = require('fs');

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
      const products = await Product.find().populate('category').exec();

      // in case no products are found
      if (!products.length) {
        console.log("products array is empty".success_request);
        return res.status(200).json({
          success: true,
          message: "No products found",
          products,
        });
      }

      console.log("Success to get all products".success_request);
      return res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        products: products,
      });
    } catch (error) {
      console.log(`error in get all products - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in get all products",
        error: error.message,
      });
    }
  },

  addProduct: async (req, res) => {
    console.log("API POST request : Add product".new_request);
    try {
      const { title, image, description, price, category, count_in_stock } = req.body;

      if (!title || !image || !description || !price || !category || !count_in_stock) {
        console.log("Missing product fields in request".failed_request);
        return res.status(400).json({
          message: "Missing fields",
        });
      }

      console.log("All product fields provided".step_done);

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
          message: "Product not found",
        });
      }

      console.log(`Success to get product by ID ${req.params.id}`.success_request);

      return res.status(200).json({
        success: true,
        product: product,
      });
    } catch (error) {
      console.log(`Error in getting product by id" ${error}`.failed_request);
      return res.status(500).json({
        message: "Error getting product by id",
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    console.log(`API PUT request : Update product by ID ${req.params.id}`.new_request);
    try {
      const product_id = req.params.id;
      const product = await Product.findById(product_id);

      if (!product) {
        console.log(`Product with ID ${product_id} not found`.failed_request);
        return res.status(404).json({
          message: `Product with ID ${product_id} not found`,
        });
      }

      console.log(`Product with ID ${order_id} found and getting updated..`.step_done);

      const updatedProduct = await Product.findByIdAndUpdate(product_id, req.body, {
        new: true,
        runValidators: true,
      });

      console.log(`Success to update Product with ID ${order_id}`.success_request);

      res.status(200).json({
        success: true,
        message: `Product with ID ${product_id} updated successfully`,
        product: updatedProduct,
      });
    } catch (error) {
      console.log(`Error in updating product by id ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in updating product by id",
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    console.log(`API DELETE request : Delete product by ID ${req.params.id}`.new_request);
    try {
      const product_id = req.params.id;

      if (!product_id) {
        console.log("Missing product ID".failed_request);
        return res.status(400).json({
          message: "Product ID is required",
        });
      }

      const product = await Product.findById(product_id);

      if (!product) {
        console.log(`Product with ID ${product_id} not found`.failed_request);
        return res.status(404).json({
          message: `Product with ID ${product_id} not found`,
        });
      }

      console.log(`Product with ID ${product_id} found`.step_done);

      await Product.findByIdAndRemove(product_id);

      console.log(`Product with ID ${product_id} deleted successfully`.success_request);

      res.status(200).json({
        success: true,
        message: `Product with ID ${product_id} deleted successfully`,
      });
    } catch (error) {
      console.log(`Error in deleting product by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in deleting product by id",
        error: error.message,
      });
    }
  },

  // managers functions
  getAllForManagers: async (req, res) => {
    console.log("Manager API GET request : get all products".new_request);
    try {
      const products = await Product.find().populate('category').exec();

      if (!products.length) {
        console.log("No products found for manager".step_done);
        return res.status(200).json({
          success: true,
          message: "No products found",
          products,
        });
      }

      console.log("Products found for manager".success_request);

      return res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        products: products,
      });
    } catch (error) {
      console.log(
        `Error occurred while getting all products for manager - ${error}`.failed_request
      );
      return res.status(500).json({
        message: "Error in get all products",
        error: error.message,
      });
    }
  },

  getByIdForManagers: async (req, res) => {
    console.log(`Manager API GET request : get product by ID ${req.params.id}`.new_request);
    try {
      const product_id = req.params.id;
      const product = await Product.findById(product_id);

      console.log(`Product ID provided - ${product_id}`.step_done);

      if (!product) {
        console.log(`Product with ID ${product_id} not found for manager`.failed_request);
        return res.status(404).json({
          message: `Product with ID ${product_id} not found`,
        });
      }

      console.log(`Product with ID ${product_id} found for manager`.success_request);
      return res.status(200).json({
        success: true,
        message: `Product retrieved successfully`,
        product: product,
      });
    } catch (error) {
      console.log(
        `Error occurred while getting product by ID for manager - ${error}`.failed_request
      );
      return res.status(500).json({
        message: "Error in getting product by id for manager",
        error: error.message,
      });
    }
  },

  addProductForManagers: async (req, res) => {
    console.log("Manager API POST request : Add product".new_request);
    try {
      const {
        title,
        description,
        price,
        category,
        count_in_stock
      } = req.body;

      const image = `http://localhost:3000/uploads/${req.file.filename}`;

      if (!title || !description || !price || !category || !count_in_stock) {
        console.log("Missing product fields in manager request".failed_request);
        return res.status(400).json({
          message: "Missing fields",
        });
      }

      // Verify that the category exists
      const categoryRecord = await Category.findById(category);
      if (!categoryRecord) {
        console.log(`Category with ID ${category} not found`.failed_request);
        return res.status(404).json({
          message: `Category with ID ${category} not found`,
        });
      }

      console.log("All product fields provided by manager".step_done);

      const new_product = new Product({
        title,
        image,
        description,
        price,
        category,
        count_in_stock,
      });

      await new_product.save();

      const populatedProduct = await Product.findById(new_product._id).populate('category');

      console.log("Product created successfully by manager".success_request);
      return res.status(201).json({
        success: true,
        message: "Product created successfully by manager",
        new_product: populatedProduct
      });
    } catch (error) {
      console.log(`Create product error in manager request - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error creating product in manager request",
        error: error.message,
      });
    }
  },

  updateByIdForManagers: async (req, res) => {
    console.log(`Manager API PUT request : Update product by ID ${req.params.id}`.new_request);
    try {
      const product_id = req.params.id;
      const product = await Product.findById(product_id);

      if (!product) {
        console.log(`Product with ID ${product_id} not found`.failed_request);
        return res.status(404).json({
          message: `Product with ID ${product_id} not found`,
        });
      }

      // Verify that the new category exists if it's provided
      if (req.body.category) {
        const categoryRecord = await Category.findById(req.body.category);
        if (!categoryRecord) {
          console.log(`Category with ID ${req.body.category} not found`.failed_request);
          return res.status(404).json({
            message: `Category with ID ${req.body.category} not found`,
          });
        }
      }

      console.log(`Product with ID ${product_id} found`.step_done);

      const oldImages = Array.isArray(product.image) ? product.image : [product.image];
      oldImages.forEach(async (oldImageURL) => {
        const oldImageFileName = path.basename(oldImageURL);
        const oldImagePath = path.join(__dirname, '../public/uploads', oldImageFileName);
        if (fs.existsSync(oldImagePath)) {
          try {
            await fs.promises.unlink(oldImagePath);
          } catch (error) {
            console.log(`Error deleting old image - ${error}`.failed_request);
          }
        }
      });

      const updatedProduct = await Product.findByIdAndUpdate(product_id, req.body, {
        new: true,
        runValidators: true,
      });

      console.log(`Product with ID ${product_id} updated successfully`.success_request);

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.log(`Error in updating product by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in updating product by id",
        error: error.message,
      });
    }
  },


  deleteByIdForManagers: async (req, res) => {
    console.log(`Manager API DELETE request : Delete product by ID ${req.params.id}`.new_request);
    try {
      const product_id = req.params.id;
      const product = await Product.findById(product_id);

      if (!product) {
        console.log(`Product with ID ${product_id} not found`.failed_request);
        return res.status(404).json({
          message: `Product with ID ${product_id} not found`,
        });
      }

      console.log(`Product with ID ${product_id} found`.step_done);

      const oldImages = Array.isArray(product.image) ? product.image : [product.image];
      oldImages.forEach(async (oldImageURL) => {
        const oldImageFileName = path.basename(oldImageURL);
        const oldImagePath = path.join(__dirname, '../public/uploads', oldImageFileName);
        if (fs.existsSync(oldImagePath)) {
          try {
            await fs.promises.unlink(oldImagePath);
          } catch (error) {
            console.log(`Error deleting old image - ${error}`.failed_request);
          }
        }
      });

      await Product.findByIdAndDelete(product_id);

      console.log(`Product with ID ${product_id} deleted successfully`.success_request);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.log(`Error in deleting product by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in deleting product by id",
        error: error.message,
      });
    }
  },

  uploadNewProductImageForManager: async (req, res) => {
    console.log(`Manager API POST request : Upload new product image`.new_request);
    try {
      const image = `http://localhost:3000/uploads/${req.file.filename}`;

      return res.status(200).json({
        success: true,
        message: `success to upload new product image - for managers`,
        image
      })

    } catch (error) {
      return res.status(500).json({
        message: `error in upload new product image - for managers`,
        error: error.message,
      })

    }
  },
};
