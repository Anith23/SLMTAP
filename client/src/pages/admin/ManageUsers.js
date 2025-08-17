import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './AdminDashboard.css';
import './ManageUsers.css';
import axios from 'axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: '' });

  // Fetch users from backend API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  // Delete user handler with backend call
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        // Update local state
        setUsers(users.filter(user => user.id !== id && user._id !== id));
        if (editingUserId === id) {
          setEditingUserId(null);
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  // Start editing a user
  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditFormData({ name: user.name, email: user.email, role: user.role });
  };

  // Handle input changes in the edit form
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  // Save edited user to backend
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUserId}`, editFormData);
      // Update local users state after save
      setUsers(users.map(user =>
        user._id === editingUserId ? { ...user, ...editFormData } : user
      ));
      setEditingUserId(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  // Cancel editing
  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  // Filter users based on search term (case-insensitive)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2>Manage Users</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user._id}>
                  {editingUserId === user._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="role"
                          value={editFormData.role}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <button className="save-btn" onClick={handleSaveClick}>Save</button>
                        <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;
