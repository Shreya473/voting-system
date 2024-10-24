import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AuthPage from './components/AuthPage';
import VotePage from './components/VotePage';
import VoteCountPage from './components/VoteCountPage';
import ConfirmationPage from './components/ConfirmationPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authenticate" element={<AuthPage />} />
          <Route path="/vote" element={<VotePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/vote" element={<VotePage />} />
          <Route path="/vote-counts" element={<VoteCountPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
