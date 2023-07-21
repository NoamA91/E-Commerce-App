const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const userAuth = require("../middlewares/auth_user");
const managerAuth = require("../middlewares/auth_managers");
const adminAuth = require("../middlewares/auth_admin");

const {
  getAll,
  getById,
} = require("../controllers/products_controller");

// managers functions
const {
  getAllForManagers,
  getByIdForManagers,
  addProductForManagers,
  updateByIdForManagers,
  deleteByIdForManagers,
  uploadNewProductImageForManager
} = require("../controllers/products_controller");

router.get("/getAll", getAll);
router.get("/getById/:id", getById);

// managers requests
router.get("/managers/all", managerAuth, getAllForManagers);
router.get("/managers/get-by-id/:id", managerAuth, getByIdForManagers);
router.post("/managers/add-product", managerAuth, upload.single("image"), addProductForManagers);
router.put("/managers/update-product/:id", managerAuth, updateByIdForManagers);
router.delete("/managers/delete-product/:id", managerAuth, deleteByIdForManagers);
router.post("/managers/add-new-image", managerAuth, upload.single("image"), uploadNewProductImageForManager);

module.exports = router;
