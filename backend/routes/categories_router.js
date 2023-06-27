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
router.get('/managers/all', getAllCategoriesForManagers);
router.get('/managers/get-by-id/:id', getCategoryByIdForManagers);
router.post('/managers/add-category', addNewCategoryForManagers);
router.delete('/managers/delete-category/:id', deleteCategoryByIdForManagers);
router.put('/managers/update-category/:id', updateCategoryByIdForManagers);


module.exports = router;