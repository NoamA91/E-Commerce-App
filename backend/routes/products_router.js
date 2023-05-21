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

router.get("/getAll", getAll);
router.get("/getById/:id", getById);
router.post("/addProduct", addProduct);
router.put("/updateById/:id", updateById);
router.delete("/deleteById/:id", deleteById);

module.exports = router;
