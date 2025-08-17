import React, { useState } from 'react';
import './HospitalsSection.css';

const HospitalsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const hospitals = [
    'General Hospital Colombo',
    'General Hospital Trincomalee',
    'General Hospital Jaffna',
    'General Hospital Vavuniya',
  ];

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="hospitals-section">
      <h2>Partnered Hospitals Across Sri Lanka</h2>
      <p className="intro">
        Our platform collaborates with a wide network of certified hospitals to provide verified, updated
        treatment data. From urban clinics to rural medical centers, you’ll find the care you need—fast.
      </p>

      <div className="hospital-featured">
        <img src="/images/hospital-network.png" alt="Hospital Network" />
        <div className="featured-text">
          <h3>Featured</h3>
          <ul>
            <li>Government General Hospitals</li>
            <li>Private Multi-Specialty Hospitals</li>
            <li>Regional Medical Centers</li>
            <li>Specialized Clinics (e.g., Cardiac, Pediatric)</li>
          </ul>
        </div>
      </div>

      <h3>Hospitals</h3>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Hospital Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>

      <div className="hospital-list">
        {filteredHospitals.map((hospital, index) => (
          <div key={index} className="hospital-card">
            <span className="hospital-icon">H</span>
            <span>{hospital}</span>
          </div>
        ))}
      </div>

      <div className="hospital-side-img">
        <img src="/images/hospital-building.png" alt="Hospital Illustration" />
      </div>
    </section>
  );
};

export default HospitalsSection;
