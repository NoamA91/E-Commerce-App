const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');

const {
  registerUser,
  loginUser
} = require('../controllers/users_controller');


router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
