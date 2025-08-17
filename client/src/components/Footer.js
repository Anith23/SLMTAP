import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-column brand">
          <h3 className="logo-box">SLMTAP</h3>
          <p>
            Sri Lanka National Medical Treatment Availability Portal
          </p>
          <p>
            Access real-time hospital treatment availability, beds, and emergency info in one place.
          </p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">How it Works</a></li>
            <li><a href="#">Hospitals</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Treatment Availability</a></li>
            <li><a href="#">Hospital Directory</a></li>
            <li><a href="#">Emergency Info</a></li>
            <li><a href="#">Online Bookings</a></li>
            <li><a href="#">COVID-19 Services</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <p>No -04, Main Street, Colombo, Sri Lanka.</p>
          <p>+94 774053185</p>
          <p>info@slmtap.lk</p>
        </div>
      </div>

      <hr className="divider" />

      <div className="footer-bottom">
        <span>© 2025 SLMTAP. All Rights Reserved.</span>
        <span>|</span>
        <span>Designed by CyberSoft Solution</span>
      </div>
    </footer>
  );
};

export default Footer;
