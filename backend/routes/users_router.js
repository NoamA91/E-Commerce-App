const express = require('express');
const router = express.Router();
const userAuth = require('../middlewares/auth_user');

const {
  registerUser,
  loginUser,
  updateById
} = require('../controllers/users_controller');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:id', userAuth, updateById)

module.exports = router;
