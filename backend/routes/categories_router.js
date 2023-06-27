const express = require("express");
const router = express.Router();
const managerAuth = require("../middlewares/auth_managers");

// manager functions from categories controller
const {
    getAllCategoriesForManagers,
    getCategoryByIdForManagers,
    addNewCategoryForManagers,
    deleteCategoryByIdForManagers,
    updateCategoryByIdForManagers
} = require("../controllers/categories_controller");


// managers requests
router.get('/managers/all', managerAuth, getAllCategoriesForManagers);
router.get('/managers/get-by-id/:id', managerAuth, getCategoryByIdForManagers);
router.post('/managers/add-category', managerAuth, addNewCategoryForManagers);
router.delete('/managers/delete-category/:id', managerAuth, deleteCategoryByIdForManagers);
router.put('/managers/update-category/:id', managerAuth, updateCategoryByIdForManagers);


module.exports = router;