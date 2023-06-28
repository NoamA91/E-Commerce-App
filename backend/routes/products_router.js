const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth_user");
const managerAuth = require("../middlewares/auth_managers");
const adminAuth = require("../middlewares/auth_admin");

const {
  getAll,
  getById,
  addProduct,
  updateById,
  deleteById,
} = require("../controllers/products_controller");

// managers functions
const {
  getAllForManagers,
  getByIdForManagers,
  addProductForManagers,
  updateByIdForManagers,
  deleteByIdForManagers,
} = require("../controllers/products_controller");

router.get("/getAll", getAll);
router.get("/getById/:id", getById);
router.post("/add", addProduct);
router.put("/updateById/:id", updateById);
router.delete("/deleteById/:id", deleteById);

// managers requests
router.get("/managers/all" , managerAuth , getAllForManagers);
router.get("/managers/get-by-id/:id", managerAuth, getByIdForManagers);
router.post("/managers/add-product", managerAuth , addProductForManagers);
router.put("/managers/update-product/:id" , managerAuth , updateByIdForManagers);
router.delete("/managers/delete-product/:id" , managerAuth , deleteByIdForManagers);

module.exports = router;
