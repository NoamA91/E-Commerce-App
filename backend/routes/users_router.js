const express = require('express');
const router = express.Router();

const {
  registerUser
} = require('../controllers/users_controller');


router.post('/register', registerUser);

module.exports = router;
