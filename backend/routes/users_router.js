const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth_user");
const adminAuth = require("../middlewares/auth_admin");
const superAdminAuth = require("../middlewares/auth_superAdmin");

const {
  registerUser,
  loginUser,
  updateById,
  getById,
  getAll,
  deleteById,
} = require("../controllers/users_controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updateByid/:id", userAuth, updateById);
router.get("/getById/:id", getById);
router.get("/getAll", getAll);
router.delete("deleteById/:id", deleteById);

module.exports = router;
