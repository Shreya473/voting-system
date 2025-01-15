import React, { useState } from 'react';
import './AdminLogin.css'; // Import styles

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginAPI = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      return data.success; // Returns true if login is successful
    } catch (error) {
      console.error('Login error:', error);
      return false; // Return false in case of error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await loginAPI(username, password); // Use the defined function

    if (isValid) {
      onLoginSuccess(); // Call the success handler
    } else {
      alert('Login failed. Please check your credentials.'); // Handle failed login
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
