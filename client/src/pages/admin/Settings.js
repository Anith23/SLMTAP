import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Settings.css';
import axios from 'axios';

const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const adminId = 'YOUR_ADMIN_ID'; // replace with actual admin id or get from auth context

  useEffect(() => {
    // Fetch admin data on mount
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/admin/${adminId}`);
        setFullName(res.data.fullName);
        setEmail(res.data.email);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      }
    };
    fetchAdmin();
  }, [adminId]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/admin/${adminId}`, { fullName, email });
      // Optionally show a success message here
      console.log('Saved Info:', res.data);
      closeModal();
    } catch (err) {
      console.error('Failed to save admin data:', err);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="settings-page">
        <h2>Settings</h2>

        <div className="settings-list">
          <div className="settings-row">
            <span className="setting-title">Update Profile</span>
            <button className="edit-btn" onClick={openModal}>Edit</button>
          </div>
          <div className="settings-row">
            <span className="setting-title">Change Password</span>
            <button className="edit-btn" onClick={() => alert('Change Password')}>Edit</button>
          </div>
          <div className="settings-row">
            <span className="setting-title">Notification Performance</span>
            <button className="edit-btn" onClick={() => alert('Notification Settings')}>Edit</button>
          </div>
          <div className="settings-row">
            <span className="setting-title">Manage Account</span>
            <button className="edit-btn" onClick={() => alert('Manage Account')}>Edit</button>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Update Profile</h3>
              <label>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
              />
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
              <div className="modal-actions">
                <button className="save-btn" onClick={handleSave}>Save</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
