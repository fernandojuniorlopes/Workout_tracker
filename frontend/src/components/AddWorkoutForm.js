import React, { useState, useEffect } from 'react';
import './styles/main.css';

const AddWorkoutForm = () => {
  const userId = localStorage.getItem('response');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [userWorkouts, setUserWorkouts] = useState([]);

  useEffect(() => {
    // Fetch user workouts when the component mounts
    const fetchUserWorkouts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/workouts/api/user/${userId}`);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setUserWorkouts(data);
        } else {
          console.error('Error fetching user workouts');
        }
      } catch (error) {
        console.error('Error fetching user workouts:', error);
      }
    };

    fetchUserWorkouts();
  }, [userId]); // Fetch again when userId changes

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const workoutData = { userId, date, name, sets, reps };

    try {
      const response = await fetch('http://localhost:5000/workouts/api/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        const data = await response.json();
        // Update user workouts after adding a new workout
        setUserWorkouts([...userWorkouts, { ...workoutData, _id: data.workoutId }]);
        // Clear form fields
        setName('');
        setDate('');
        setSets(0);
        setReps(0);
      } else {
        console.error('Error creating workout');
      }
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };
  const handleDeleteWorkout = async (workoutId) => {
    try {
      // Check if workoutId is available and not undefined
      if (!workoutId) {
        console.error('Invalid workoutId for deletion');
        return;
      }
  
      // Indicate that the deletion is in progress
      // You can use a loading state to handle UI feedback
      // setLoading(true);
  
      const response = await fetch(`http://localhost:5000/workouts/api/deleteWorkout/${workoutId}`, {
        method: 'DELETE',
      });
  
      // Remove the deleted workout from the state
      setUserWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout._id !== workoutId)
      );
  
      if (response.ok) {
        console.log('Workout deleted successfully');
        // Refresh the workouts on the frontend after deletion
        // You can either make a new request to get the updated list or update the state
      } else {
        console.error('Error deleting workout');
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    } finally {
      // Reset the loading state when the operation is complete
      // setLoading(false);
    }
  };
  return (
    <div>
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workout name"
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="date"
        />
      </div>
      <div>
        <label>Sets:</label>
        <input
          type="number"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </div>
      <div>
        <label>Reps:</label>
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </div>
      <button type="submit">Add Workout</button>
    </form>
      <div className='workout-item'>
      {userWorkouts.map((workout, index) => (
      <div key={workout._id || index}>
          {/* Display workout information */}
          <p>Name:{workout.name}&nbsp;Date:{workout.date}&nbsp;Set:{workout.sets}&nbsp;Rep:{workout.reps}</p>
          {/* Add a Delete button */}
          <button onClick={() => handleDeleteWorkout(workout._id)}>Delete</button>
        </div>
      ))}
    </div>
    </div>
  );
};
export default AddWorkoutForm;
