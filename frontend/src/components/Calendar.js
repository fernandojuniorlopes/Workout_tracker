import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import colorScheme from './utils/ColorScheme';
import Legend from './utils/Legend';
import './styles/main.css';
import AddWorkoutModal from './AddWorkoutModal'; 

const Calendar = ({ userWorkouts, handleDeleteExercise, handleFormSubmit }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal

  const handleDateClick = (info) => {
    setSelectedDate(info.date);
    // Open the modal when a date is clicked
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  const handleSubmitForm = (formData) => {
    // Pass the form data to the handleFormSubmit function
    handleFormSubmit(formData);
    // Close the modal after submitting the form
    setIsModalOpen(false);
  };
  

  const eventContent = ({ event, el }) => {
    // Set background color based on the bodyPart property or use a default color
    const backgroundColor = colorScheme[event.extendedProps.bodyPart] || 'gray';

    return (
      <div className="event-content" style={{ backgroundColor }}>
        <p>
          <b>
            Exercise: {event.title}, Sets: {event.extendedProps.sets}, Reps: {event.extendedProps.reps}&nbsp;
          </b>
          <div>
          <button onClick={() => handleDeleteExercise(event.extendedProps.workoutId)}><b>x</b></button>
          </div>
        </p>
      </div>
    );
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    contentHeight: 'auto',
    dateClick: handleDateClick, // Use dateClick prop
  };

  return (
    <div>
      <Legend />
      <FullCalendar
        {...calendarOptions}
        events={userWorkouts.map((workout) => ({
          title: workout.name,
          start: new Date(workout.date),
          sets: workout.sets,
          reps: workout.reps,
          bodyPart: workout.bodyPart,
          workoutId: workout._id,
        }))}
        eventContent={eventContent}
      />
      <AddWorkoutModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        handleFormSubmit={handleSubmitForm}
        selectedDate={selectedDate}/>
    </div>
  );
};

export default Calendar;
