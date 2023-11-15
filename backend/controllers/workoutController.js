const Workout = require('../models/workoutModel'); // Import your user model
const logger = require('../utils/logger');

const workoutController = {
    async createWorkout(req, res) {
        const { userId, date, name, reps, sets, bodyPart} = req.body;
        try {
          // Create a new workout 
          const newWorkout = new Workout({ userId, date, name, reps, sets, bodyPart});
          await newWorkout.save();
          logger.info(newWorkout);
          const workout = await Workout.findOne(newWorkout);
          res.json({ workoutId: workout._id});
        } catch (err) {
          res.status(500).json({ message: 'Fail to add workout' });
        }
    },
    async getUserWorkouts (req, res) {
      const userId = req.params.userId;
  
      try {
        // Fetch workouts for the specified user
        const userWorkouts = await Workout.find({ userId: userId });
        // logger.info(userWorkouts);
        res.json(userWorkouts);
      } catch (error) {
        console.error('Error fetching user workouts:', error);
        res.status(500).json({ message: 'Error fetching user workouts' });
      }
    },
    async deleteWorkout(req, res) {
      const workoutId = req.params.workoutId;
  
      try {
        // Find and delete the workout by ID
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
  
        if (deletedWorkout) {
          res.json({ message: 'Workout deleted successfully' });
        } else {
          res.status(404).json({ message: 'Workout not found' });
        }
      } catch (err) {
        res.status(500).json({ message: 'Error deleting workout' });
      }
    },
  };
  
  module.exports = workoutController;