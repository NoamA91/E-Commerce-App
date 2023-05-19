const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth_user");
const managerAuth = require("../middlewares/auth_managers");
const adminAuth = require("../middlewares/auth_admin");

// users functions
const {
  registerUser,
  loginUser,
  updateById,
  getById,
  getAll,
  deleteById,
  changePassword,
} = require("../controllers/users_controller");

// managers functions
const {
  registerManager,
  loginManager,
  getManagerById,
  updateManagerById,
  deleteManagerById,
  changeManagerPassword,
} = require("../controllers/managers_controller");

//TODO: admin functions
const {} = require("../controllers/admins_controller");

// users requests
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updateByid/:id" /* , userAuth */, updateById);
router.get("/getById/:id", getById);
router.get("/getAll", getAll);
router.delete("/deleteById/:id" /* , userAuth */, deleteById);
router.post("/change_password/:id" /* ,userAuth */, changePassword);

// managers requests
router.post("/managers/login", loginManager);
router.get("/managers/getById/:id", getManagerById);
router.put("/managers/updateById/:id" /* , managerAuth */, updateManagerById);
router.delete(
  "/managers/deleteById/:id" /* , managerAuth */,
  deleteManagerById
);
router.put(
  "/managers/change_password/:id" /* , managerAuth */,
  changeManagerPassword
);

//TODO: admin requests

module.exports = router;
