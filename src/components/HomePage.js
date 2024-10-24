import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Handle registration button click
  const handleRegister = () => {
    navigate('/register');
  };

  // Handle verification button click
  const handleVerify = () => {
    navigate('/authenticate'); // Navigate to authentication/verification page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Voting System</h1>
      <p style={styles.description}>
        Please choose one of the options below:
      </p>
      <button onClick={handleRegister} style={styles.button}>
        New Registration
      </button>
      <button onClick={handleVerify} style={styles.button}>
        Verify and Vote
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:'url("https://media.istockphoto.com/id/1488642770/photo/indian-flag-paint-brush-on-white-background-the-concept-of-india-drawing-brushstroke-grunge.jpg?s=612x612&w=0&k=20&c=bmaJuvmEUhXxvf9qx-EeEQ5tlySdPDSnJfchpbZqF1g=")',
    height: "97vh",
    // marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
  },
  description: {
    fontSize: '1.25rem',
    color: '#666',
    margin: '20px 0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
    transition: 'background-color 0.3s',
  },
};

export default HomePage;
