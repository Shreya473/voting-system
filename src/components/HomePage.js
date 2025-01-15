import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin'; // Import AdminLogin component
import AdminSignIn from './AdminSignIn'; // Import AdminSignIn component
import './HomePage.css'; // Custom styles

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false); // For Admin SignIn
  const navigate = useNavigate();

  // Show login modal
  const handleOpenLogin = () => {
    setShowModal(true);
    setShowSignIn(false);
  };

  // Show sign-in form
  const handleOpenSignIn = () => {
    setShowSignIn(true);
    setShowModal(false);
  };

  // Handle successful login and navigate to authenticate
  const handleLoginSuccess = () => {
    setShowModal(false); // Close the login modal
    navigate('/authenticate'); // Navigate to authenticate page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">VOTING SYSTEM</div>
        <ul className="nav-links">
          <li><a href="/vote-counts">Vote Count</a></li>
          <li><button onClick={handleOpenLogin}>Admin Login</button></li>
          <li><button onClick={handleOpenSignIn}>Admin Sign In</button></li>
        </ul>
      </nav>

      {/* Render Admin Login or Sign In form */}
      {showModal && <AdminLogin onLoginSuccess={handleLoginSuccess} />}
      {showSignIn && <AdminSignIn />}

      {/* Logo */}
      <div className="logo">
        <a href="/">
          <img src="http://localhost:5000/images/logo.png" alt="eci" />
        </a>
      </div>

      {/* Carousel */}
      <div className="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="http://localhost:5000/images/1.jpg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src="http://localhost:5000/images/2.jpg" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src="http://localhost:5000/images/3.jpg" alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control prev" onClick={() => {/* Add carousel logic */}}>Previous</button>
        <button className="carousel-control next" onClick={() => {/* Add carousel logic */}}>Next</button>
      </div>

      {/* SWEEP Section */}
      <div className="sweep">
        <center>
          <div className="sweep-logo">
            <img src="http://localhost:5000/images/sweep-logo.png" alt="sweep-logo" />
          </div>
          <div className="description">
            <h2>Systematic Voters’ Education and Electoral Participation</h2>
            <p>“Greater Participation for a Stronger Democracy”</p>
          </div>
        </center>
        <div className="features">
          <div className="feature-item">
            <img src="http://localhost:5000/images/4.png" alt="Feature 1" />
          </div>
          <div className="feature-item">
            <img src="http://localhost:5000/images/5.jpg" alt="Feature 2" />
          </div>
          <div className="feature-item">
            <img src="http://localhost:5000/images/6.png" alt="Feature 3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
