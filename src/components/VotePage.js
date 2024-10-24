import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


// Example party data with names and image URLs for symbols
const parties = [
  { name: 'Bharatiya Janata Party (BJP)', symbol: 'https://upload.wikimedia.org/wikipedia/hi/thumb/e/ec/Bharatiya_Janata_Party_logo.svg.png/800px-Bharatiya_Janata_Party_logo.svg.png' },
  { name: 'Indian National Congress (INC)', symbol: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Indian_National_Congress_hand_logo.svg' },
  { name: 'Shiv Sena (ES)', symbol: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo_of_Shiv_Sena.svg/1200px-Logo_of_Shiv_Sena.svg.png' },
  { name: 'Shiv Sena (UT)', symbol: 'https://images.seeklogo.com/logo-png/52/1/shivsena-uddhav-balasaheb-thackeray-logo-png_seeklogo-528339.png' },
  { name: 'Maharashtra Navnirman Sena (MNS)', symbol: 'https://mnsadhikrut.org/wp-content/uploads/2020/03/MNS-flag-rajmudra.png' },
  { name: 'Nationalist Congress Party (NCP)', symbol: 'https://i.pinimg.com/originals/27/f9/70/27f9706d7aef3db82e2e12c537561b2a.jpg' }
];

const VotePage = () => {
  const [selectedParty, setSelectedParty] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const location = useLocation(); // To access voter details from AuthPage
  const { aadharNumber, voterId } = location.state || {}; // Extract from state

  const  handleVote = async (e) => {
    e.preventDefault();
    if (selectedParty) {
      setNotification('');
      try {
        const response = await axios.get('http://localhost:5000/api/save-vote', {
          aadharNumber,
          voterId,
          selectedParty
        });
        if (response.status === 200) {
          setNotification('Vote Submitted');
          navigate('/confirmation', {
            state: { aadharNumber, voterId, selectedParty }
          });
        }
      } catch (error) {
        setError('Failed to fetch fingerprint. Please try again.');
      }
      // Navigate to confirmation with all necessary data
      
    } else {
      setError('Please select a party to vote for.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Vote for your party</h2>
        <div style={styles.partyList}>
          {parties.map((party, index) => (
            <label key={index} style={styles.partyOption}>
              <input
                type="radio"
                name="party"
                value={party.name}
                onChange={(e) => setSelectedParty(e.target.value)}
                style={styles.radio}
              />
              <img src={party.symbol} alt={`${party.name} symbol`} style={styles.symbol} />
              {party.name}
            </label>
          ))}
        </div>
        <button onClick={handleVote} style={styles.button}>Submit Vote</button>
        {error && <p style={styles.error}>{error}</p>}
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
  formWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  partyList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  partyOption: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    fontSize: '1.2rem',
  },
  radio: {
    marginRight: '10px',
  },
  symbol: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
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
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default VotePage;
