import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './ManageTreatments.css';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

function ManageTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [hospitals, setHospitals] = useState([]); // All hospitals
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    name: '',
    hospital: '',
    availability: 'Available',
    description: '',
    district: '',
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    hospital: '',
    availability: 'Available',
    description: '',
    district: '',
  });

  // Derive districts from hospitals list
  const districts = Array.from(new Set(hospitals.map(h => h.location))).sort();

  useEffect(() => {
    fetchTreatments();
    fetchHospitals();
  }, []);

  const fetchTreatments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/treatments');
      setTreatments(res.data);
    } catch (err) {
      console.error('Failed to fetch treatments:', err);
    }
  };

  const fetchHospitals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hospitals');
      setHospitals(res.data);
    } catch (err) {
      console.error('Failed to fetch hospitals:', err);
    }
  };

  // Filter hospitals for Add form by selected district
  const filteredHospitalsForAdd = newTreatment.district
    ? hospitals.filter(h => h.location === newTreatment.district)
    : hospitals;

  // Filter hospitals for Edit form by selected district
  const filteredHospitalsForEdit = editData.district
    ? hospitals.filter(h => h.location === editData.district)
    : hospitals;

  // Add new treatment
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTreatment.name || !newTreatment.hospital) {
      alert('Please fill in required fields');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/treatments', newTreatment);
      setTreatments([res.data, ...treatments]);
      setNewTreatment({ name: '', hospital: '', availability: 'Available', description: '', district: '' });
      setShowAddForm(false);
    } catch (err) {
      console.error('Failed to add treatment:', err);
    }
  };

  // Start editing a treatment
  const handleEdit = (t) => {
    // t.hospital is populated object; get district from it
    const hospitalObj = t.hospital;
    setEditId(t._id);
    setEditData({
      name: t.name,
      hospital: hospitalObj ? hospitalObj._id : '',
      availability: t.availability,
      description: t.description,
      district: hospitalObj ? hospitalObj.location : '',
    });
  };

  // Update treatment
  const handleUpdate = async (id) => {
    if (!editData.name || !editData.hospital) {
      alert('Required fields cannot be empty');
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/api/treatments/${id}`, {
        name: editData.name,
        hospital: editData.hospital,
        availability: editData.availability,
        description: editData.description,
      });
      setTreatments(treatments.map(t => (t._id === id ? res.data : t)));
      setEditId(null);
      setEditData({ name: '', hospital: '', availability: 'Available', description: '', district: '' });
    } catch (err) {
      console.error('Failed to update treatment:', err);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);
    setEditData({ name: '', hospital: '', availability: 'Available', description: '', district: '' });
  };

  // Delete treatment
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this treatment?')) {
      try {
        await axios.delete(`http://localhost:5000/api/treatments/${id}`);
        setTreatments(treatments.filter(t => t._id !== id));
      } catch (err) {
        console.error('Failed to delete treatment:', err);
      }
    }
  };

  // Filter treatments by search term
  const filtered = treatments.filter(t => {
    const hospitalName = t.hospital ? t.hospital.name.toLowerCase() : '';
    return (
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      hospitalName.includes(search.toLowerCase())
    );
  });

  // Helper to get hospital name by hospital object
  const getHospitalName = (hospital) => {
    return hospital ? hospital.name : 'Unknown Hospital';
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="top-header">
          <h2>Manage Treatments</h2>
          <button className="add-btn" onClick={() => setShowAddForm(!showAddForm)}>
            <FaPlus /> Add Treatment
          </button>
        </div>

        {showAddForm && (
          <form className="add-form" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Treatment Name"
              value={newTreatment.name}
              onChange={(e) => setNewTreatment({ ...newTreatment, name: e.target.value })}
            />

            {/* District dropdown */}
            <select
              value={newTreatment.district}
              onChange={(e) => setNewTreatment({ ...newTreatment, district: e.target.value, hospital: '' })}
            >
              <option value="">Select District</option>
              {districts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Hospitals filtered by district */}
            <select
              value={newTreatment.hospital}
              onChange={(e) => setNewTreatment({ ...newTreatment, hospital: e.target.value })}
              disabled={!newTreatment.district}
            >
              <option value="">Select Hospital</option>
              {filteredHospitalsForAdd.map(h => (
                <option key={h._id} value={h._id}>{h.name}</option>
              ))}
            </select>

            <select
              value={newTreatment.availability}
              onChange={(e) => setNewTreatment({ ...newTreatment, availability: e.target.value })}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>

            <input
              type="text"
              placeholder="Description (optional)"
              value={newTreatment.description}
              onChange={(e) => setNewTreatment({ ...newTreatment, description: e.target.value })}
            />

            <button type="submit">Save</button>
            <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </form>
        )}

        <input
          className="search-bar"
          type="text"
          placeholder="Search by Treatment or Hospital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Treatment Name</th>
              <th>Hospital</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t._id}>
                <td>{t._id.slice(-6)}</td>
                <td>
                  {editId === t._id ? (
                    <input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    t.name
                  )}
                </td>
                <td>
                  {editId === t._id ? (
                    <>
                      {/* District dropdown in edit */}
                      <select
                        value={editData.district}
                        onChange={(e) => setEditData({ ...editData, district: e.target.value, hospital: '' })}
                      >
                        <option value="">Select District</option>
                        {districts.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>

                      {/* Hospitals filtered by district */}
                      <select
                        value={editData.hospital}
                        onChange={(e) => setEditData({ ...editData, hospital: e.target.value })}
                        disabled={!editData.district}
                      >
                        <option value="">Select Hospital</option>
                        {filteredHospitalsForEdit.map(h => (
                          <option key={h._id} value={h._id}>{h.name}</option>
                        ))}
                      </select>
                    </>
                  ) : (
                    getHospitalName(t.hospital)
                  )}
                </td>
                <td>
                  {editId === t._id ? (
                    <select
                      value={editData.availability}
                      onChange={(e) => setEditData({ ...editData, availability: e.target.value })}
                    >
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  ) : (
                    t.availability
                  )}
                </td>
                <td>
                  {editId === t._id ? (
                    <>
                      <button onClick={() => handleUpdate(t._id)}>Save</button>
                      <button onClick={handleCancel} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(t)}>Edit</button>
                      <button onClick={() => handleDelete(t._id)} className="delete-btn">
                        Delete
                      </button>
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

export default ManageTreatments;
