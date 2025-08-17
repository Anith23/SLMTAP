import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './ViewAppointments.css';

const initialAppointments = [
  { id: 1, patient: 'Ani Jeeva', hospital: 'City Hospital', date: '2025-06-25', time: '10:30 AM', status: 'Pending' },
  { id: 2, patient: 'Tharsu', hospital: 'General Hospital', date: '2025-06-26', time: '12:00 PM', status: 'Approved' },
  { id: 3, patient: 'Jeeva', hospital: 'Sunshine Medical', date: '2025-06-27', time: '09:00 AM', status: 'Rejected' }
];

function ViewAppointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const filtered = appointments.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) ||
                        a.hospital.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="top-header">
          <h2>View Appointments</h2>
        </div>

        <div className="controls">
          <input
            type="text"
            className="search-bar"
            placeholder=" Search by Patient or Hospital"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th><th>Patient</th><th>Hospital</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.patient}</td>
                <td>{a.hospital}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>
                  <span className={`status ${a.status.toLowerCase()}`}>{a.status}</span>
                </td>
                <td>
                  <button className="approve-btn" onClick={() => handleStatusChange(a.id, 'Approved')}>Approve</button>
                  <button className="reject-btn" onClick={() => handleStatusChange(a.id, 'Rejected')}>Reject</button>
                  <button className="delete-btn" onClick={() => handleDelete(a.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default ViewAppointments;
