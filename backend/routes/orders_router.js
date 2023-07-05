const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth_user");
const managerAuth = require("../middlewares/auth_managers");
const adminAuth = require("../middlewares/auth_admin");


// users functions
const {
  addOrder
} = require("../controllers/orders_controller");


// managers functions
const {
  getAllOrdersForManagers,
  updateStatusForManagers,
  getOrderByIdForManagers,
  deleteOrderByIdForManagers
} = require("../controllers/orders_controller");



// managers requests from orders controller
router.get('/managers/all', getAllOrdersForManagers);
router.put('/managers/update-status/:id', updateStatusForManagers);
router.get('/managers/order-details/:id', getOrderByIdForManagers);
router.delete('/managers/delete-order/:id', deleteOrderByIdForManagers);

// users requests from orders controller
router.post('/add-order', addOrder);

module.exports = router;
