// Import necessary modules
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define a POST route for '/api/register'
router.post('/api/register', userController.registerUser);

// Export the router
module.exports = router;
