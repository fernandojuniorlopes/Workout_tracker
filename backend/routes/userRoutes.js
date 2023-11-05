// Import necessary modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// route POST register
router.post('/api/register', userController.registerUser);

//rout POST Log in
router.post('/api/login', userController.loginUser);

// Export the router
module.exports = router;
