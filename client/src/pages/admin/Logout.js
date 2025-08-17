import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Logout.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 👉 Clear user data (replace with real auth logic)
    localStorage.removeItem('token');
    alert('You have been logged out.');
    navigate('/'); // Redirect to home or login
  };

  const handleCancel = () => {
    navigate('/admin/dashboard'); // Go back to admin dashboard
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="logout-page">
        <div className="logout-box">
          <h2>Are you sure you want to logout?</h2>
          <div className="logout-buttons">
            <button className="yes-btn" onClick={handleLogout}>Yes, Logout</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
