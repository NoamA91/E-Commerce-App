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
router.get("/managers/getAllForManagers" /* , managerAuth */, getAllForManagers);
router.get("/managers/getByIdForManagers/:id" /* , managerAuth */, getByIdForManagers);
router.post("/managers/addForManagers" /* , managerAuth */, addProductForManagers);
router.put("/managers/updateByIdForManagers/:id" /* , managerAuth */, updateByIdForManagers);
router.delete("/managers/deleteByIdForManagers/:id" /* , managerAuth */, deleteByIdForManagers);

module.exports = router;
