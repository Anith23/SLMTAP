import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';  
import ManageHospitals from './pages/admin/ManageHospitals';
import ManageTreatments from './pages/admin/ManageTreatments';
import ViewAppointments from './pages/admin/ViewAppointments';
import Settings from './pages/admin/Settings';
import Logout from './pages/admin/Logout';
import SearchResults from './pages/SearchResults'; // Adjust path

function App() {
  // Manage login state and user info here
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // Called on login success, receive user info
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserName(user.name || 'User');
    console.log("Login successful!", user);
  };

  // Called on logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <Router>
      <Routes>
        {/* Home page at root: show login/register if logged out, else show username+logout */}
        <Route 
          path="/" 
          element={
            <HomePage 
              isLoggedIn={isLoggedIn} 
              userName={userName} 
              onLogout={handleLogout} 
            />
          } 
        />

        {/* Login page */}
        <Route 
          path="/login" 
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* Register page */}
        <Route 
          path="/register" 
          element={<RegisterPage />} 
        />

        {/* Admin pages - protect these if needed by adding similar checks */}
        <Route path="/admin/dashboard" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/users" element={isLoggedIn ? <ManageUsers /> : <Navigate to="/login" />} />
        <Route path="/admin/hospitals" element={isLoggedIn ? <ManageHospitals /> : <Navigate to="/login" />} />
        <Route path="/admin/treatment" element={isLoggedIn ? <ManageTreatments /> : <Navigate to="/login" />} />
        <Route path="/admin/appointment" element={isLoggedIn ? <ViewAppointments /> : <Navigate to="/login" />} />
        <Route path="/admin/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/admin/logout" element={<Logout />} />

        {/* Search page */}
        <Route path="/search" element={<SearchResults />} />

        {/* Redirect all unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
