const express = require('express');
const router = require('express').Router();

const {
    getAll,
    getById,
    addProduct,
    updateById,
    deleteById
} = require('../controllers/products_controller');



router.get('/getAll', getAll);
router.get('/getById/:id', getById);
router.post('/addProduct', addProduct);
router.put('/updateById/:id', updateById);
// router.delete('/deleteById/:id', deleteById);



module.exports = router;