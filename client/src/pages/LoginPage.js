import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../auth.css';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const emailTrimmed = email.trim().toLowerCase();

    // Example role check - replace with real auth API
    if (emailTrimmed === 'admin@example.com') {
      onLoginSuccess && onLoginSuccess('admin');
      navigate('/admin/dashboard');
    } else {
      onLoginSuccess && onLoginSuccess('user');
      navigate('/home');
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <img src="/avatar.png" alt="avatar" className="avatar" />
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username or email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/register" className="link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
