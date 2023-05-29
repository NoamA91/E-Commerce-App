const Cart = require("../models/Cart");
const colors = require("colors");

colors.setTheme({
  new_request: "magenta",
  success_request: "green",
  failed_request: "red",
  step_done: "blue",
});

module.exports = {
  getAll: async (req, res) => {
    console.log("API GET request : get all carts".new_request);
    try {
      const carts = await Cart.find().populate("userId").populate("cart_items.productId");

      if (!carts.length) {
        console.log("Carts array is empty".success_request);
        return res.status(200).json({
          success: true,
          message: "No carts found",
          carts,
        });
      }

      console.log("Success to get all carts".success_request);
      return res.status(200).json({
        success: true,
        message: "Carts retrieved successfully",
        carts: carts,
      });
    } catch (error) {
      console.log(`Error to get all carts - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in get all carts",
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    console.log(`API GET request : Get cart by ID ${req.params.id}`.new_request);
    try {
      const cart = await Cart.findById(req.params.id).populate("userId cart_items.productId");

      if (!cart) {
        console.log(`Cart with ID ${req.params.id} not found`.failed_request);
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      console.log(`Success to get cart by ID ${req.params.id}`.success_request);

      return res.status(200).json({
        success: true,
        cart: cart,
      });
    } catch (error) {
      console.log(`Error in getting cart by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error getting cart by id",
        error: error.message,
      });
    }
  },

  addCart: async (req, res) => {
    console.log("API POST request : Add cart".new_request);
    try {
      const { userId, cart_items } = req.body;

      if (!userId || !cart_items) {
        console.log("Missing cart fields in request".failed_request);
        return res.status(400).json({
          message: "Missing fields",
        });
      }

      console.log("All cart fields provided".step_done);

      const newCart = new Cart({
        userId,
        cart_items,
      });

      await newCart.save();

      console.log("Cart created successfully".success_request);

      res.status(201).json({
        success: true,
        message: "Cart created successfully",
        cart: newCart,
      });
    } catch (error) {
      console.log(`Error creating cart - ${error}`.failed_request);
      res.status(500).json({
        message: "Error creating cart",
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    console.log("API PUT request : Update cart".new_request);
    try {
      const cartId = req.params.id;

      if (!cartId) {
        console.log("Missing cart ID in request".failed_request);
        return res.status(400).json({
          message: "Missing cart ID",
        });
      }

      console.log("Cart ID provided".step_done);

      const cart = await Cart.findOneAndUpdate({ _id: cartId }, req.body, { new: true });

      if (!cart) {
        console.log("No cart found with provided ID".failed_request);
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      console.log("Cart updated successfully".success_request);
      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: cart,
      });
    } catch (error) {
      console.log(`Error updating cart - ${error}`.failed_request);
      res.status(500).json({
        message: "Error updating cart",
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    console.log(`API DELETE request : Delete cart by ID ${req.params.id}`.new_request);
    try {
      const cartId = req.params.id;

      if (!cartId) {
        console.log("Missing cart ID in request".failed_request);
        return res.status(400).json({
          message: "Missing cart ID",
        });
      }

      const cart = await Cart.findByIdAndDelete(cartId);

      if (!cart) {
        console.log("No cart found with provided ID".failed_request);
        return res.status(404).json({
          message: "Cart not found",
        });
      }

      console.log("Cart deleted successfully".success_request);
      res.status(200).json({
        success: true,
        message: "Cart deleted successfully",
      });
    } catch (error) {
      console.log(`Error deleting cart - ${error}`.failed_request);
      res.status(500).json({
        message: "Error deleting cart",
        error: error.message,
      });
    }
  },
};
