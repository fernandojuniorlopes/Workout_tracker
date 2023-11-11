const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

const app = express();

// Allow all origins - you might want to configure this to a specific origin in a production environment
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});
// Connecting to the database
mongoose.connect('mongodb://127.0.0.1:27017/workout_db', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

app.use(express.json());

// Routes
app.use('/', userRoutes); // Example URL: /user/register
app.use('/workouts', workoutRoutes); // Example URL: /user/register
// ... (other routes and configurations)

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
