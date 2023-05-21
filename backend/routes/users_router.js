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
  loginManager,
  getManagerById,
  updateManagerById,
  deleteManagerById,
  changeManagerPassword,
} = require("../controllers/managers_controller");

//TODO: admin functions
const {
  addManagerForAdmin,
  updateManagerByIdForAdmin,
  deleteManagerByIdForAdmin,
  getAllManagersForAdmin,
  addUserForAdmin,
  updateUserByIdForAdmin,
  deleteUserByIdForAdmin,
  getAllUsersForAdmin,
} = require("../controllers/admins_controller");

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
router.delete("/managers/deleteById/:id" /* , managerAuth */, deleteManagerById);
router.put("/managers/change_password/:id" /* , managerAuth */, changeManagerPassword);

//admin requests
router.post("/admins/add_manager" /* ,adminAuth */, addManagerForAdmin);
router.put("/admins/update_manager/:id" /* ,adminAuth */, updateManagerByIdForAdmin);
router.delete("/admins/delete_manager/:id" /* ,adminAuth */, deleteManagerByIdForAdmin);
router.get("/admins/get_all_managers" /* ,adminAuth */, getAllManagersForAdmin);

router.post("/admins/add_user" /* ,adminAuth */, addUserForAdmin);
router.put("/admins/update_user/:id" /* ,adminAuth */, updateUserByIdForAdmin);
router.delete("/admins/delete_user/:id" /* ,adminAuth */, deleteUserByIdForAdmin);
router.get("/admins/get_all_users" /* ,adminAuth */, getAllUsersForAdmin);

module.exports = router;
