// ✅ StatsPanel.js
import React from 'react';

function StatsPanel() {
  return (
    <div className="stats-panel">
      <div className="stat-box">Total Users<br /><strong>1,250</strong></div>
      <div className="stat-box">Total Hospitals<br /><strong>50</strong></div>
      <div className="stat-box">Active Appointments<br /><strong>105</strong></div>
    </div>
  );
}

export default StatsPanel;