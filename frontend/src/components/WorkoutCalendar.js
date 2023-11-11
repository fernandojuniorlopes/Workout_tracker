import { useEffect, useState } from 'react';

const WorkoutCalendar = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:5000/workouts/api/workoutsUserId', {
          headers: {
            Authorization: localStorage.getItem('token'), // Include the user token
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.error('Error fetching workouts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, []); // Run once on component mount

  // Render your calendar with the fetched workouts
  return (
    <div>
      <h2>Your Workouts</h2>
      {/* Render workouts here */}
    </div>
  );
};

export default WorkoutCalendar;
