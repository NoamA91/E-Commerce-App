const Order = require("../models/Order");
const colors = require("colors");

colors.setTheme({
  new_request: "magenta",
  success_request: "green",
  failed_request: "red",
  step_done: "blue",
});

module.exports = {
  getAll: async (req, res) => {
    console.log("API GET request : get all orders".new_request);
    try {
      const orders = await Order.find();

      if (!orders.length) {
        console.log("Orders array is empty".success_request);
        return res.status(200).json({
          success: true,
          message: "No orders found",
          orders,
        });
      }

      console.log("Success to get all orders".success_request);
      return res.status(200).json({
        success: true,
        message: "Orders retrieved successfully",
        orders: orders,
      });
    } catch (error) {
      console.log(`Error to get all orders - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in get all orders",
        error: error.message,
      });
    }
  },

  getById: async (req, res) => {
    console.log(`API GET request : Get order by ID ${req.params.id}`.new_request);
    try {
      const order = await Order.findById(req.params.id);

      console.log("Order ID provided");

      if (!order) {
        console.log(`Order with ID ${req.params.id} not found`.failed_request);
        return res.status(404).json({
          message: "Order not found",
        });
      }

      console.log(`Success to get order by ID ${req.params.id}`.success_request);

      return res.status(200).json({
        success: true,
        order: order,
      });
    } catch (error) {
      console.log(`Error in getting order by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error getting order by id",
        error: error.message,
      });
    }
  },

  addOrder: async (req, res) => {
    console.log("API POST request : Add order".new_request);
    try {
      const {
        userId,
        order_items,
        address,
        phone_number,
        payment_details,
        shipping_fee
      } = req.body;

      if (!userId) {
        console.log("Missing userId in request".failed_request);
        return res.status(400).json({
          message: "Missing userId",
        });
      }
      if (!order_items || order_items.length === 0) {
        console.log("Missing order_items in request".failed_request);
        return res.status(400).json({
          message: "Missing items in the cart",
        })
      }

      if (!address) {
        console.log("Missing address in request".failed_request);
        return res.status(400).json({
          message: "Missing address",
        })
      }

      if (!address.city) {
        console.log("Missing city in request".failed_request);
        return res.status(400).json({
          message: "Missing city",
        })
      }

      if (!address.street) {
        console.log("Missing street in request".failed_request);
        return res.status(400).json({
          message: "Missing street",
        })
      }

      if (!address.building) {
        console.log("Missing building in request".failed_request);
        return res.status(400).json({
          message: "Missing building",
        })
      }
      if (!address.apartment) {
        console.log("Missing apartment in request".failed_request);
        return res.status(400).json({
          message: "Missing apartment",
        })
      }

      if (!phone_number) {
        console.log("Missing phone_number in request".failed_request);
        return res.status(400).json({
          message: "Missing phone number",
        })
      }

      if (!payment_details) {
        console.log("Missing payment_details in request".failed_request);
        return res.status(400).json({
          message: "Missing payment details",
        })
      }

      if (shipping_fee === undefined || shipping_fee === null) {
        console.log("Missing shipping_fee in request".failed_request);
        return res.status(400).json({
          message: "Missing fields",
        });
      }

      console.log("All order fields provided".step_done);

      const newOrder = new Order({
        userId,
        order_items,
        address,
        phone_number,
        payment_details,
        shipping_fee,
      });

      await newOrder.save();

      console.log("Order created successfully".success_request);

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order: newOrder,
      });
    } catch (error) {
      console.log(`Error creating order - ${error}`.failed_request);
      res.status(500).json({
        message: "Error creating order",
        error: error.message,
      });
    }
  },

  updateById: async (req, res) => {
    console.log(`API PUT request : Update order by ID ${req.params.id}`.new_request);
    try {
      const order_id = req.params.id;
      const order = await Order.findById(order_id);

      if (!order) {
        console.log(`Order with ID ${order_id} not found`.failed_request);
        return res.status(404).json({
          message: `Order with ID ${order_id} not found`,
        });
      }

      console.log(`Order with ID ${order_id} found and getting updated..`.step_done);

      const updatedOrder = await Order.findByIdAndUpdate(order_id, req.body, {
        new: true,
        runValidators: true,
      });

      console.log(`Success to update order with ID ${order_id}`.success_request);

      res.status(200).json({
        success: true,
        message: `Order with ID ${order_id} updated successfully`,
        order: updatedOrder,
      });
    } catch (error) {
      console.log(`Error in updating order by id ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in updating order by id",
        error: error.message,
      });
    }
  },

  deleteById: async (req, res) => {
    console.log(`API DELETE request : Delete order by ID ${req.params.id}`.new_request);
    try {
      const order_id = req.params.id;
      const order = await Order.findById(order_id);

      if (!order) {
        console.log(`Order with ID ${order_id} not found`.failed_request);
        return res.status(404).json({
          message: `Order with ID ${order_id} not found`,
        });
      }

      console.log(`Order with ID ${order_id} found and getting deleted..`.step_done);

      await Order.findByIdAndRemove(order_id);

      console.log(`Success to delete order with ID ${order_id}`.success_request);

      res.status(200).json({
        success: true,
        message: `Order with ID ${order_id} deleted successfully`,
      });
    } catch (error) {
      console.log(`Error in deleting order by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in deleting order by id",
        error: error.message,
      });
    }
  },
  // customers functions
  getAllOrdersByCustomerId: async (req, res) => {
    console.log('Api GET request : get all orders for customer');
    try {
      const userId = req.params.id;
      const orders = await Order.find({ userId })
        .populate('order_items.productId').exec();

      if (!orders.length) {
        console.log("Orders array is empty".failed_request);
        return res.status(200).json({
          success: true,
          message: "No orders found",
          orders,
        });
      }

      console.log("Success to get all orders for customer".success_request);
      return res.status(200).json({
        success: true,
        message: "Orders retrieved successfully for customer",
        orders,
      });
    } catch (error) {
      console.log(`Error to get all orders for customer - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in get all orders for customer",
        error: error.message,
      })
    }
  },

  // managers functions
  getAllOrdersForManagers: async (req, res) => {
    console.log("API GET request : get all orders for managers".new_request);
    try {
      const orders = await Order.find().populate({
        path: 'userId',
        select: 'email role username'
      }).populate('order_items.productId').exec();

      if (!orders.length) {
        console.log("Orders array is empty".success_request);
        return res.status(200).json({
          success: true,
          message: "No orders found",
          orders,
        });
      }

      console.log("Success to get all orders for managers".success_request);
      return res.status(200).json({
        success: true,
        message: "Orders retrieved successfully for managers",
        orders,
      });
    } catch (error) {
      console.log(`Error to get all orders for managers - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in get all orders for managers",
        error: error.message,
      });
    }
  },

  updateStatusForManagers: async (req, res) => {
    console.log(`API PUT request (Manager): Update order status by ID ${req.params.id}`.new_request);
    try {
      const order_id = req.params.id;
      const { status } = req.body;

      if (!status || !['new', 'processing', 'done', 'canceled'].includes(status)) {
        console.log("Invalid status provided".failed_request);
        return res.status(400).json({
          message: "Invalid status. Must be either 'new', 'processing', 'done', or 'canceled'.",
        });
      }

      const order = await Order.findById(order_id);

      if (!order) {
        console.log(`Order with ID ${order_id} not found`.failed_request);
        return res.status(404).json({
          message: `Order with ID ${order_id} not found`,
        });
      }

      console.log(`Order with ID ${order_id} found and getting status updated..`.step_done);

      order.status = status;
      await order.save();

      console.log(`Success to update status of order with ID ${order_id}`.success_request);

      res.status(200).json({
        success: true,
        message: `Order with ID ${order_id} status updated successfully`,
        order,
      });
    } catch (error) {
      console.log(`Error in updating order status by id ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in updating order status by id",
        error: error.message,
      });
    }
  },

  getOrderByIdForManagers: async (req, res) => {
    console.log(`API GET request (Manager): Get order by ID ${req.params.id}`.new_request);
    try {
      const order = await Order.findById(req.params.id)
        .populate(['userId', 'order_items.productId'])
        .exec();

      console.log("Order ID provided".step_done);

      if (!order) {
        console.log(`Order with ID ${req.params.id} not found`.failed_request);
        return res.status(404).json({
          message: "Order not found",
        });
      }

      console.log(`Success to get order by ID ${req.params.id}`.success_request);

      return res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.log(`Error in getting order by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error getting order by id",
        error: error.message,
      });
    }
  },

  deleteOrderByIdForManagers: async (req, res) => {
    console.log(`API DELETE request (Manager): Delete order by ID ${req.params.id}`.new_request);
    try {
      const order_id = req.params.id;
      const order = await Order.findById(order_id);

      if (!order) {
        console.log(`Order with ID ${order_id} not found`.failed_request);
        return res.status(404).json({
          message: `Order with ID ${order_id} not found`,
        });
      }

      console.log(`Order with ID ${order_id} found and getting deleted..`.step_done);

      await Order.findByIdAndDelete(order_id);

      console.log(`Success to delete order with ID ${order_id}`.success_request);

      res.status(200).json({
        success: true,
        message: `Order with ID ${order_id} deleted successfully`,
      });
    } catch (error) {
      console.log(`Error in deleting order by id - ${error}`.failed_request);
      return res.status(500).json({
        message: "Error in deleting order by id",
        error: error.message,
      });
    }
  },
  //_____________________________________

}


