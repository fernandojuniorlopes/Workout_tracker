import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import AddWorkoutModal from './AddWorkoutModal';

const Workouts = () => {
  const userId = localStorage.getItem('response');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [bodyPart, setbodyPart] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleBodyPartChange = (event) => {
    setbodyPart(event.target.value);
  };


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
      // Destructure values directly from the event
  const { name, date, sets, reps, bodyPart } = event;

  // Construct the payload
  const workoutData = {
    userId,
    name,
    date,
    sets,
    reps,
    bodyPart,
  };
    try {
      const response = await fetch('http://localhost:5000/workouts/api/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });
      console.log('Workout data submitted:', workoutData);

      if (response.ok) {
        const data = await response.json();
        // Update user workouts after adding a new workout
        setUserWorkouts([...userWorkouts, { ...workoutData, _id: data.workoutId }]);
        // Clear form fields
        // setName('');
        // setDate('');
        // setSets(0);
        // setReps(0);
        // setbodyPart('');
      } else {
        console.error('Error creating workout');
      }
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const handleDeleteExercise = async (workoutId) => {
    try {
        const response = await fetch(`http://localhost:5000/workouts/api/deleteWorkout/${workoutId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setUserWorkouts((prevWorkouts) =>
                prevWorkouts.filter((workout) => workout._id !== workoutId)
            );
            console.log('Exercise deleted successfully');
            // Update your state or fetch data again to reflect the changes
        } else {
            console.error('Error deleting exercise');
        }
    } catch (error) {
        console.error('Error deleting exercise:', error);
    }
};
  return (
    <div>
      {/* Render Calendar component and pass userWorkouts as a prop */}
      <Calendar userWorkouts={userWorkouts} handleDeleteExercise={handleDeleteExercise} handleFormSubmit={handleFormSubmit}/>
      <AddWorkoutModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Workouts;
