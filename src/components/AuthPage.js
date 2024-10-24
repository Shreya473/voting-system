import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [voterId, setVoterId] = useState('');
  const [fingerprint, setFingerprint] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [isFetchingFingerprint, setIsFetchingFingerprint] = useState(false);
  const navigate = useNavigate();

  const handleFetchFingerprint = async () => {
    setError('');
    setIsFetchingFingerprint(true);

    try {
      const response = await axios.get('http://localhost:5001/api/verify-fingerprint');
      setFingerprint(response.data.fingerprint);
      
    } catch (error) {
      setError('Failed to fetch fingerprint. Please try again.');
    } finally {
      setIsFetchingFingerprint(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setNotification('');

    try {
      const verificationResponse = await axios.post('http://localhost:5000/api/verify', {
        aadharNumber,
        voterId,
        fingerprint,
      });
      
      if (verificationResponse.status === 200) {
        setNotification('You are a Verified User!');
        navigate('/vote', { state: { aadharNumber, voterId } });
      }

      // THIS WILL GO IN VotePage.JS, BAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!

      // if (verificationResponse.status === 200) {
      //   setNotification('You are a Verified User!');
      //   // navigate('/confirmation', { state: { aadharNumber, voterId, party: saveResponse.data.party } });
      //   // Save to the database
      //   const saveResponse = await axios.post('http://localhost:5000/api/save-vote', {
      //     aadharNumber,
      //     voterId,
      //     fingerprint, // You can add party info here if needed
      //   });

      //   if (saveResponse.status === 200) {
      //     // Navigate to confirmation page
      //     navigate('/confirmation', { state: { aadharNumber, voterId, party: saveResponse.data.party } });
      //   } else {
      //     setError('Failed to save your vote. Please try again.');
      //   }
      else {
        setError('Verification failed. Please check your details.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Verify Your Identity</h1>
      <form onSubmit={handleVerify} style={styles.form}>
        <input
          type="text"
          placeholder="Aadhar Card Number"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          style={styles.input}
          required
        />
        <div style={styles.fingerprintContainer}>
          <input
            name="FingerprintInput"
            type="text"
            placeholder="Fingerprint (Identifier)"
            value={fingerprint}
            onChange={(e) => setFingerprint(e.target.value)}
            style={styles.fingerprintinput}
            required
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
        <button type="submit" style={styles.button}>Verify</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
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
    padding: '5px 10px',
    fontSize: '0.85rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    margin: '10px 0px 10px 5px',
    width: 'auto',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default AuthPage;
