const mongoose = require('mongoose');
const workoutSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date },
    name: String,
    sets: Number,
    reps: Number,
    bodyPart: String
  }, { collection: 'workouts' });
module.exports = mongoose.model('Workout', workoutSchema);
  