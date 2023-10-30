const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/workout_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Workout Tracking App'); // This is a simple response to display on the root URL
});
