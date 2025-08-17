import React from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom'; // ✅ use NavLink
import { FaTachometerAlt, FaUser, FaHospital, FaStethoscope, FaCalendarAlt, FaCog, FaPowerOff } from 'react-icons/fa';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>ADMIN</h2>
      <ul>
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUser /> Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/hospitals" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaHospital /> Manage Hospitals
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/treatment" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaStethoscope /> Manage Treatment
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/appointment" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCalendarAlt /> View Appointments
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/Settings" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCog /> Settings
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/logout" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaPowerOff /> Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
