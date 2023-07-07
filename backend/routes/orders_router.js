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
  getOrderByIdForManagers,
  updateStatusForManagers,
  deleteOrderByIdForManagers
} = require("../controllers/orders_controller");



// managers requests from orders controller
router.get('/managers/all', managerAuth, getAllOrdersForManagers);
router.get('/managers/get-order-by-id/:id', managerAuth, getOrderByIdForManagers);
router.put('/managers/update-status/:id', managerAuth, updateStatusForManagers);
router.delete('/managers/delete-order/:id', managerAuth, deleteOrderByIdForManagers);

// users requests from orders controller
router.post('/add-order', addOrder);

module.exports = router;
