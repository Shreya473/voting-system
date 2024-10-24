import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VoteCountPage = () => {
  const [parties, setParties] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the vote counts from the server
    const fetchVoteCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/parties');
        if (response.status === 200) {
          setParties(response.data);
        }
      } catch (err) {
        setError('Failed to fetch vote counts');
      }
    };

    fetchVoteCounts();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h2 style={styles.title}>Vote Counts</h2>
        {error && <p style={styles.error}>{error}</p>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Party Name</th>
              <th style={styles.th}>Votes</th>
            </tr>
          </thead>
          <tbody>
            {parties.map((party, index) => (
              <tr key={index}>
                <td style={styles.td}>{party.name}</td>
                <td style={styles.td}>{party.votes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
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
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    fontSize: '1.1rem',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
    fontSize: '1rem',
    border: '1px solid #ddd',
  },
  error: {
    color: 'red',
  },
};

export default VoteCountPage;
