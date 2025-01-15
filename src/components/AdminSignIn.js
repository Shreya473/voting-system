// src/components/AdminSignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import './AdminSignIn.css'; // Add styles as needed

const AdminSignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin-signin', {
        username,
        password,
      });
      if (response.data.success) {
        setSuccess('Admin registered successfully!');
        setError('');
      }
    } catch (err) {
      setError('Error registering admin');
    }
  };

  return (
    <div className="admin-signin">
      <h2>Admin Sign In</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default AdminSignIn;
