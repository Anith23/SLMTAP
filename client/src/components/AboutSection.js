import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-container">
      <div className="about-top">
        <div className="about-left">
          <h2>Empowering Access to Healthcare in Sri Lanka</h2>
          <p>
            The Sri Lanka National Medical Treatment Availability Portal (SLMTAP) is a digital initiative
            to centralize and simplify access to healthcare services across the nation.
            Our mission is to bridge the gap between patients and healthcare providers by offering real-time
            data on treatment availability in both government and private hospitals.
          </p>
        </div>
        <div className="about-right">
          <img src="/images/doctor.png" alt="Doctor" />
        </div>
      </div>

      <div className="about-mid">
        <div className="about-box">
          <h3>Core Objectives</h3>
          <ul>
            <li>Provide real-time availability of treatments.</li>
            <li>Connect users to nearby hospitals based on their needs.</li>
            <li>Ensure equitable healthcare access for all Sri Lankans.</li>
          </ul>
        </div>
        <div className="about-box">
          <img src="/images/hospital-icon-big.png" alt="Hospital icon" />
        </div>
      </div>

      <div className="about-bottom">
        <div className="about-box">
          <img src="/images/support-icon.png" alt="Support" />
        </div>
        <div className="about-box">
          <h3>Why Choose SLMTAP?</h3>
          <ul>
            <li>Trusted by 100+ hospitals island-wide</li>
            <li>Fast, reliable, and user-friendly</li>
            <li>Backed by healthcare professionals and government bodies</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
