import React, { useState } from 'react';
import Modal from 'react-modal';

// AddWorkoutModal.js
const AddWorkoutModal = ({ isOpen, onRequestClose, handleFormSubmit, selectedDate  }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);
  const [bodyPart, setBodyPart] = useState('');
  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000, // Set a higher z-index than the calendar
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      maxHeight: '400px',
      overflow: 'auto',
    },
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the logic to send workout data to the backend using handleFormSubmit
    handleFormSubmit({
      name,
      date: selectedDate,
      sets,
      reps,
      bodyPart
    });
    // Clear form fields after submission
    setName('');
    setDate('');
    setSets(0);
    setReps(0);
    setBodyPart('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={modalStyle}
      ariaHideApp={false}
    >
      <div>
        <form onSubmit={handleSubmit}>
        <h3>Add a new exercise: </h3>
        <b>Date: {selectedDate && selectedDate.toLocaleDateString()}</b>
          <div>
            <label>Name:</label>
            <input
              type="text"
              placeholder="Workout name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div>
            <label htmlFor="bodyPart">Select Body Part:</label>
            <select
              id="bodyPart"
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="chest">Chest</option>
              <option value="shoulders">Shoulders</option>
              <option value="legs">Legs</option>
            </select>
          </div>
          <button type="submit">Add Workout</button>
        </form>
      </div>
    </Modal>
  );
};
export default AddWorkoutModal;

