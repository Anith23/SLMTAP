import React, { useState, useEffect } from 'react';
import './HomePage.css';
import AboutSection from '../components/AboutSection';
import HowItWorksSection from '../components/HowItWorksSection';
import HospitalsSection from '../components/HospitalsSection';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


function HomePage() {
  const [districts, setDistricts] = useState([]);
  const [hospitalTypes, setHospitalTypes] = useState([]);
  const [treatments, setTreatments] = useState([]);

  const [district, setDistrict] = useState('');
  const [hospitalType, setHospitalType] = useState('');
  const [treatment, setTreatment] = useState('');

  const [searchResults, setSearchResults] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Load districts on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/districts')
      .then(res => res.json())
      .then(data => setDistricts(data))
      .catch(err => console.error(err));
  }, []);

  // Load hospital types when district changes
  useEffect(() => {
    if (district) {
      fetch(`http://localhost:5000/api/hospitalTypes?district=${encodeURIComponent(district)}`)
        .then(res => res.json())
        .then(data => setHospitalTypes(data))
        .catch(err => {
          console.error(err);
          setHospitalTypes([]);
        });
    } else {
      setHospitalTypes([]);
      setHospitalType('');
    }
  }, [district]);

  // Load treatments when district or hospitalType changes
  useEffect(() => {
    if (district && hospitalType) {
      fetch(`http://localhost:5000/api/treatments?district=${encodeURIComponent(district)}&hospitalType=${encodeURIComponent(hospitalType)}`)
        .then(res => res.json())
        .then(data => setTreatments(data))
        .catch(err => {
          console.error(err);
          setTreatments([]);
        });
    } else {
      setTreatments([]);
      setTreatment('');
    }
  }, [district, hospitalType]);

  const handleSearch = () => {
    if (!district || !hospitalType || !treatment) {
      alert("Please select all fields.");
      return;
    }

    fetch(`http://localhost:5000/api/search?district=${encodeURIComponent(district)}&hospitalType=${encodeURIComponent(hospitalType)}&treatment=${encodeURIComponent(treatment)}`)
      .then(res => res.json())
      .then(data => {
        setSearchResults(data);
        setShowPopup(true);
      })
      .catch(err => {
        console.error('Search failed:', err);
        alert('Failed to fetch search results.');
      });
  };

  const closePopup = () => {
    setShowPopup(false);
    setSearchResults(null);
  };

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" />
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#about">About Us</a>         {/* We'll discuss below */}
          <a href="#how-it-works">How It Work</a>
          <a href="#hospitals">Hospitals</a>
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </nav>

      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Find Available Medical Treatments Across Sri Lanka – Instantly!</h1>
          <p>
            A national portal to search and track treatment availability in
            government and private hospitals. Helping you access critical
            care when you need it most.
          </p>

          <div className="search-form">
            <select value={district} onChange={e => setDistrict(e.target.value)}>
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            <select
              value={hospitalType}
              onChange={e => setHospitalType(e.target.value)}
              disabled={!district}
            >
              <option value="">Select Hospital Type</option>
              {hospitalTypes.map(ht => (
                <option key={ht} value={ht}>{ht}</option>
              ))}
            </select>

            <select
              value={treatment}
              onChange={e => setTreatment(e.target.value)}
              disabled={!hospitalType}
            >
              <option value="">Select Treatment</option>
              {treatments.map(t => (
                <option key={t._id} value={t.name}>{t.name}</option>
              ))}
            </select>

            <button onClick={handleSearch}>Search Now</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/home.png" alt="Doctors & Map" />
        </div>
      </section>

      {/* Popup for search results */}
      {showPopup && (
        <div className="search-popup-overlay">
          <div className="search-popup">
            <button className="close-btn" onClick={closePopup}>X</button>
            <h2>Search Results</h2>
            {searchResults && searchResults.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Treatment</th>
                    <th>Hospital</th>
                    <th>District</th>
                    <th>Hospital Type</th>
                    <th>Contact</th>
                    <th>Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map(result => (
                    <tr key={result._id}>
                      <td>{result.treatmentName}</td>
                      <td>{result.hospitalName}</td>
                      <td>{result.district}</td>
                      <td>{result.hospitalType}</td>
                      <td>{result.contact}</td>
                      <td>
                        <button onClick={() => alert(`Booking for ${result.treatmentName} at ${result.hospitalName}`)}>
                          Book Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results found for your search.</p>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      <section className="features">
        <div className="feature-box">
          <img src="/images/hospitals.png" alt="Hospitals" />
          <p><strong>100+</strong> Registered Hospitals</p>
        </div>
        <div className="feature-box">
          <img src="/images/recent.png" alt="Real Time" />
          <p><strong>Real Time</strong> Treatment Availability</p>
        </div>
        <div className="feature-box">
          <img src="/images/hospitals.png" alt="Booking" />
          <p><strong>Easy</strong> Online Booking</p>
        </div>
      </section>

      {/* Other sections */}
      <AboutSection />
      <HowItWorksSection />
      <HospitalsSection />
      <Footer />
    </div>
  );
}

export default HomePage;
