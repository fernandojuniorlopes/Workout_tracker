// Import necessary modules
const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

// Then in your route handlers or controllers:
router.post('/api/addWorkout', workoutController.createWorkout);
router.get('/api/user/:userId', workoutController.getUserWorkouts);
router.delete('/api/deleteWorkout/:workoutId', workoutController.deleteWorkout);

// Export the router
module.exports = router;