import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { aadharNumber, voterId } = location.state || {};

  // Define the redirect function
  const handleRedirect = () => {
    navigate('/authenticate'); // Replace with the actual path to the authenticate page
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2>Vote Confirmed</h2>
        <p>Your vote has been successfully recorded!</p>
        <p><strong>Aadhar Number:</strong> {aadharNumber}</p>
        <p><strong>Voter ID:</strong> {voterId}</p>
        {/* Uncomment if you plan to display the party voted for */}
        {/* <p><strong>Party Voted For:</strong> {party}</p> */}
        <button onClick={handleRedirect} style={styles.submitButton}>Go to Authenticate Page</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    textAlign: 'center',
    backgroundImage: 'url("https://media.istockphoto.com/id/1488642770/photo/indian-flag-paint-brush-on-white-background-the-concept-of-india-drawing-brushstroke-grunge.jpg?s=612x612&w=0&k=20&c=bmaJuvmEUhXxvf9qx-EeEQ5tlySdPDSnJfchpbZqF1g=")',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  submitButton: {
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ConfirmationPage;
