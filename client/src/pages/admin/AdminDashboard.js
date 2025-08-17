// ✅ AdminDashboard.js
import React from 'react';
import './AdminDashboard.css';
import Sidebar from './Sidebar';
import StatsPanel from './StatsPanel';
import TreatmentChart from './TreatmentChart';
import DailyVisits from './DailyVisits';
import ActivityFeed from './ActivityFeed';
import DailyVisitsChart from './DailyVisitsChart';
import './AdminDashboard.css';


function AdminDashboard() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <h1>Admin Control Panel</h1>
        <StatsPanel />
        <div className="row">   
          <TreatmentChart />
          <ActivityFeed />
        </div>

        <div className="row">
          <DailyVisits />
          <DailyVisitsChart />
        </div>
      
       
      </div>

       
      
    </div>

    
  );
}

export default AdminDashboard;