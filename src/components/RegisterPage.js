import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [voterId, setVoterId] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [age, setAge] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();
  const [isFetchingFingerprint, setIsFetchingFingerprint] = useState(false);

  // Function to handle fingerprint fetching
  const handleFetchFingerprint = async () => {
    setNotification('');
    setIsFetchingFingerprint(true);

    try {
      const response = await axios.get('http://localhost:5001/api/fetch-fingerprint');
      setFingerprint(response.data.fingerprint);
      setNotification('Fingerprint fetched successfully.');

      // Show alert after fingerprint is fetched
      alert('Remove fingerprint');
    } catch (error) {
      setNotification('Failed to fetch fingerprint. Please try again.');
    } finally {
      setIsFetchingFingerprint(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        aadharNumber,
        voterId,
        fingerprint,
        age: Number(age),
      });

      setNotification(response.data.message);

      // Clear the form
      setName('');
      setAadharNumber('');
      setVoterId('');
      setFingerprint('');
      setAge('');

      // Redirect to the home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      if (error.response) {
        setNotification(error.response.data.error);
      } else {
        setNotification('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register New User</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Aadhar Number (12 digits)"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          required
          maxLength={12}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          required
          style={styles.input}
        />

        <div style={styles.fingerprintContainer}>
          <input
            name="FingerprintInput"
            type="text"
            placeholder="Fingerprint (fetched from Arduino)"
            value={fingerprint}
            readOnly
            required
            style={styles.fingerprintinput}
          />
          <button
            type="button"
            onClick={handleFetchFingerprint}
            disabled={isFetchingFingerprint}
            style={styles.button1}
          >
            {isFetchingFingerprint ? 'Fetching Fingerprint...' : 'Fetch Fingerprint'}
          </button>
        </div>

        <input
          type="number"
          placeholder="Age (must be at least 18)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          min={18}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      {notification && <p style={styles.notification}>{notification}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://media.istockphoto.com/id/1488642770/photo/indian-flag-paint-brush-on-white-background-the-concept-of-india-drawing-brushstroke-grunge.jpg?s=612x612&w=0&k=20&c=bmaJuvmEUhXxvf9qx-EeEQ5tlySdPDSnJfchpbZqF1g=")',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
  },
  input: {
    padding: '10px',
    margin: '10px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  fingerprintinput: {
    padding: '10px',
    margin: '10px 5px 10px 0px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  fingerprintContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    margin: "5px 20px 5px 0px",
    // marginRight: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '10px 0',
    width: '100%',
  }, 
  button1: {
    padding: '5px 10px',         // Smaller padding for a smaller button
    fontSize: '0.85rem',          // Slightly smaller font size
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '10px 0px 10px 5px',           // Increased margin to create space between the button and text box
    width: 'auto',                // Auto width for a compact button size
  },
  notification: {
    color: 'red',
    marginTop: '20px',
  },
};

export default RegisterPage;
