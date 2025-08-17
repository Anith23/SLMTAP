// ✅ Chart.js
import React from 'react';

function Chart() {
  return (
    <div className="chart-box">
      <h3>Treatment Types</h3>
      <ul>
        <li><span style={{ color: '#1a1a40' }}>⬤</span> General Consultation</li>
        <li><span style={{ color: '#4a47a3' }}>⬤</span> Dental Care</li>
        <li><span style={{ color: '#6a67ce' }}>⬤</span> Eye Care / Ophthalmology</li>
        <li><span style={{ color: '#8c8ffc' }}>⬤</span> ENT Treatments</li>
      </ul>
    </div>
  );
}

export default Chart;