import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManageHospitals.css';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const districts = [
  'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha',
  'Hambantota', 'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
  'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
  'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
];

function ManageHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState('');
  const [newHospital, setNewHospital] = useState({
    name: '',
    location: '',
    contact: '',
    hospitalType: '',
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    location: '',
    contact: '',
    hospitalType: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hospitals');
      setHospitals(res.data);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
    }
  };

  const handleAddHospital = async (e) => {
    e.preventDefault();
    if (!newHospital.name || !newHospital.location || !newHospital.contact || !newHospital.hospitalType) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/hospitals', newHospital);
      setHospitals([res.data, ...hospitals]);
      setNewHospital({ name: '', location: '', contact: '', hospitalType: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to add hospital:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hospital?')) {
      try {
        await axios.delete(`http://localhost:5000/api/hospitals/${id}`);
        setHospitals(hospitals.filter(h => h._id !== id));
      } catch (error) {
        console.error('Failed to delete hospital:', error);
      }
    }
  };

  const handleEdit = (hospital) => {
    setEditId(hospital._id);
    setEditData({
      name: hospital.name,
      location: hospital.location,
      contact: hospital.contact || '',
      hospitalType: hospital.hospitalType || '',
    });
  };

  const handleUpdate = async (id) => {
    if (!editData.name || !editData.location || !editData.contact || !editData.hospitalType) {
      alert('Please enter all fields.');
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/hospitals/${id}`, editData);
      setHospitals(hospitals.map(h => (h._id === id ? res.data : h)));
      setEditId(null);
      setEditData({ name: '', location: '', contact: '', hospitalType: '' });
    } catch (error) {
      console.error('Failed to update hospital:', error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({ name: '', location: '', contact: '', hospitalType: '' });
  };

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase()) ||
    (h.contact && h.contact.toLowerCase().includes(search.toLowerCase())) ||
    (h.hospitalType && h.hospitalType.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="top-header">
          <h2>Admin Control Panel</h2>
          <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
            <FaPlus /> Add Hospital
          </button>
        </div>

        <h3>Manage Hospitals</h3>

        {showAddForm && (
          <form className="add-hospital-form" onSubmit={handleAddHospital}>
            <input
              type="text"
              placeholder="Hospital Name"
              value={newHospital.name}
              onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
            />
            <select
              value={newHospital.location}
              onChange={(e) => setNewHospital({ ...newHospital, location: e.target.value })}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Contact Number"
              value={newHospital.contact}
              onChange={(e) => setNewHospital({ ...newHospital, contact: e.target.value })}
            />
            <select
              value={newHospital.hospitalType}
              onChange={(e) => setNewHospital({ ...newHospital, hospitalType: e.target.value })}
            >
              <option value="">Select Hospital Type</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowAddForm(false)} className="cancel-btn">
              Cancel
            </button>
          </form>
        )}

        <input
          type="text"
          className="search-bar"
          placeholder="Search Hospitals"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="hospital-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>District</th>
              <th>Contact</th>
              <th>Hospital Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHospitals.map(h => (
              <tr key={h._id}>
                <td>{h._id.slice(-6)}</td>
                <td>
                  {editId === h._id ? (
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    h.name
                  )}
                </td>
                <td>
                  {editId === h._id ? (
                    <select
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    >
                      <option value="">Select District</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  ) : (
                    h.location
                  )}
                </td>
                <td>
                  {editId === h._id ? (
                    <input
                      value={editData.contact}
                      onChange={(e) => setEditData({ ...editData, contact: e.target.value })}
                    />
                  ) : (
                    h.contact
                  )}
                </td>
                <td>
                  {editId === h._id ? (
                    <select
                      value={editData.hospitalType}
                      onChange={(e) => setEditData({ ...editData, hospitalType: e.target.value })}
                    >
                      <option value="">Select Hospital Type</option>
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                    </select>
                  ) : (
                    h.hospitalType
                  )}
                </td>
                <td>
                  {editId === h._id ? (
                    <>
                      <button className="save-btn" onClick={() => handleUpdate(h._id)}>Update</button>
                      <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => handleEdit(h)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(h._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageHospitals;
