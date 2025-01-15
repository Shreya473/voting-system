import React, { useEffect, useState } from 'react';
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

const VoteCountPage = () => {
  const [voteCounts, setVoteCounts] = useState(parties.map(party => ({ ...party, votes: 0 }))); // Initialize with default parties
  const [error, setError] = useState('');

  // Fetch the vote counts from the server
  const fetchVoteCounts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/parties');
      if (response.status === 200) {
        setVoteCounts(response.data);
      }
    } catch (err) {
      setError('Failed to fetch vote counts');
    }
  };

  useEffect(() => {
    // Fetch vote counts on component mount
    fetchVoteCounts();

    // Set up polling to fetch vote counts every 5 seconds
    const interval = setInterval(fetchVoteCounts, 5000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>Vote Counts</h2>
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.voteBox}>
          {voteCounts.map((party, index) => (
            <div key={index} style={styles.partyItem}>
              {/* <img src={`${party.symbol}`} alt={`${party.name} symbol`} style={styles.symbol} /> */}
              {/* <img src={`${party.symbol}`} style={styles.symbol} /> */}
              <span style={styles.partyName}>{party.name}</span>
              <span style={styles.voteCount}>{party.votes}</span>
            </div>
          ))}
        </div>
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
    backgroundImage: 'url("https://media.istockphoto.com/id/1488642770/photo/indian-flag-paint-brush-on-white-background-the-concept-of-india-drawing-brushstroke-grunge.jpg?s=612x612&w=0&k=20&c=bmaJuvmEUhXxvf9qx-EeEQ5tlySdPDSnJfchpbZqF1g=")',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    textAlign: 'center',
  },
  wrapper: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  voteBox: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: '#f9f9f9',
  },
  partyItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    borderBottom: '1px solid #ddd',
  },
  partyName: {
    fontSize: '1.2rem',
    flexGrow: 1,
    textAlign: 'left',
  },
  voteCount: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  symbol: {
    width: '40px',
    height: '40px',
    marginRight: '10px',
  },
  error: {
    color: 'red',
  },
};

export default VoteCountPage;
