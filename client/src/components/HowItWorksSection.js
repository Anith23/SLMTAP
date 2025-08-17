import React from 'react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  return (
    <section className="how-it-works">
      <div className="how-content">
        <h2>Simple Steps to Find the Treatment You Need</h2>

        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <div>
              <h3>Search</h3>
              <p>Enter the treatment name, hospital, or select district and hospital type from dropdowns on the homepage.</p>
            </div>
          </div>

          <div className="step">
            <span className="step-number">2</span>
            <div>
              <h3>Filter & View</h3>
              <p>Apply filters to find the most relevant hospitals and treatments available in real-time.</p>
            </div>
          </div>

          <div className="step">
            <span className="step-number">3</span>
            <div>
              <h3>Book or Visit</h3>
              <p>Use the portal to book appointments or find directions to the hospital for immediate care.</p>
            </div>
          </div>

          <div className="bonus">
            <h3>Bonus</h3>
            <p>Quickly search and compare services across hospitals before making a decision.</p>
          </div>
        </div>
      </div>

      <div className="how-image">
        <img src="/images/how-it-works.png" alt="User using portal" />
      </div>
    </section>
  );
};

export default HowItWorksSection;
