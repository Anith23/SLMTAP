import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../auth.css';

function RegisterPage({ onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();  // Get navigate function

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering", name, email, password);

    // Here you would call your registration API, then on success:
    onRegisterSuccess && onRegisterSuccess();

    // After successful registration, redirect to login page
    navigate('/login');
  };

  // Navigate to login page when clicking "Log in"
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <img src="/avatar.png" alt="avatar" className="avatar" />
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <span className="link" onClick={goToLogin} style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>Log in</span>
      </p>
    </div>
  );
}

export default RegisterPage;
