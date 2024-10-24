import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { aadharNumber, voterId, party } = location.state || {};

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
      <h2>Vote Confirmed</h2>
      <p>Your vote has been successfully recorded!</p>
      <p><strong>Aadhar Number:</strong> {aadharNumber}</p>
      <p><strong>Voter ID:</strong> {voterId}</p>
      <p><strong>Party Voted For:</strong> {party}</p>
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
};

export default ConfirmationPage;
