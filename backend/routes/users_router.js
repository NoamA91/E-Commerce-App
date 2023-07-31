const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/auth_user");
const managerAuth = require("../middlewares/auth_managers");
const adminAuth = require("../middlewares/auth_admin");

// functions from users controller
const {
  registerUser,
  loginUser,
  logoutUser,
  authUser,
  updateById,
  getById,
  getAll,
  deleteById,
  changePassword,
  getAllUsersForManager,
  getUserByIdForManager,
  updateUserByIdForManager,
  addUserForManager,
  deleteUserByIdForManager
} = require("../controllers/users_controller");

// managers functions
const {
  loginManager,
  logoutManager,
  authManager,
  getManagerById,
  updateManagerById,
  deleteManagerById,
  changeManagerPassword,
} = require("../controllers/managers_controller");

// admin functions
const {
  loginAdmin,
  getAllAdmins,
  getAdminById,
  addAdminForAdmin,
  updateAdminById,
  deleteAdminById,
  changeAdminPassword, //TODO:

  addManagerForAdmin,
  updateManagerByIdForAdmin,
  deleteManagerByIdForAdmin,
  getAllManagersForAdmin,
  getManagerByIdForAdmin,

  addUserForAdmin,
  updateUserByIdForAdmin,
  deleteUserByIdForAdmin,
  getAllUsersForAdmin,
} = require("../controllers/admins_controller");

// users requests
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", userAuth, logoutUser);
router.get("/auth", authUser);
router.put("/updateByid/:id", userAuth, updateById);
router.get("/getById/:id", getById);
router.get("/getAll", getAll);
router.delete("/deleteById/:id" /* , userAuth */, deleteById);
router.post("/change_password/:id" /* ,userAuth */, changePassword);

// managers requests
router.post("/managers/login", loginManager);
router.post("/managers/logout", managerAuth, logoutManager);
router.get("/managers/auth", authManager);
router.get("/managers/getById/:id", getManagerById);
router.put("/managers/updateById/:id" /* , managerAuth */, updateManagerById);
router.delete("/managers/deleteById/:id" /* , managerAuth */, deleteManagerById);
router.put("/managers/change_password/:id" /* , managerAuth */, changeManagerPassword);
router.get('/managers/getAllForManager', managerAuth, getAllUsersForManager);
router.get('/managers/getUserByIdForManager/:id'/* , managerAuth */, getUserByIdForManager);
router.put('/managers/updateUserByIdForManager/:id', managerAuth, updateUserByIdForManager);
router.post('/managers/addUserForManager', managerAuth, addUserForManager);
router.delete('/managers/deleteUserByIdForManager/:id', managerAuth, deleteUserByIdForManager);


// admins requests from admins controller
// router.post("/admins/login", loginAdmin);
// router.get("/admins/getAll" /* ,adminAuth */, getAllAdmins);
// router.get("/admins/getById/:id" /* ,adminAuth */, getAdminById);
// router.post("/admins/add_admin" /* ,adminAuth */, addAdminForAdmin);
// router.put("/admins/updateById/:id" /* ,adminAuth */, updateAdminById);
// router.delete("/admins/deleteById/:id" /* ,adminAuth */, deleteAdminById);
// // router.put("/admins/change_password/:id" /* ,adminAuth */, changeAdminPassword);

// router.post("/admins/add_manager" /* ,adminAuth */, addManagerForAdmin);
// router.put("/admins/update_manager/:id" /* ,adminAuth */, updateManagerByIdForAdmin);
// router.delete("/admins/delete_manager/:id" /* ,adminAuth */, deleteManagerByIdForAdmin);
// router.get("/admins/get_all_managers" /* ,adminAuth */, getAllManagersForAdmin);
// router.get("/admins/get_manager_by_id/:id" /* ,adminAuth */, getManagerByIdForAdmin);

// router.post("/admins/add_user" /* ,adminAuth */, addUserForAdmin);
// router.put("/admins/update_user/:id" /* ,adminAuth */, updateUserByIdForAdmin);
// router.delete("/admins/delete_user/:id" /* ,adminAuth */, deleteUserByIdForAdmin);
// router.get("/admins/get_all_users" /* ,adminAuth */, getAllUsersForAdmin);

module.exports = router;
