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

//TODO: managers functions
const {} = require("../controllers/managers_controller");

//TODO: admin functions
const {} = require("../controllers/admins_controller");

// users routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updateByid/:id" /* , userAuth */, updateById);
router.get("/getById/:id", getById);
router.get("/getAll", getAll);
router.delete("/deleteById/:id", deleteById);
router.post("/change_password/:id", changePassword);

//TODO: managers routes

//TODO: admin routes

module.exports = router;
