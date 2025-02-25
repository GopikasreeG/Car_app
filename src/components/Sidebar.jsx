// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/'); // Redirect to the login page
  };

  return (
    <div className="sidebar">
      <Link to="/admin/add-vehicle" className="sidebar-link">
        Add a Vehicle
      </Link>
      <Link to="/admin/vehicle-list" className="sidebar-link">
        View Vehicle List
      </Link>
      <Link to="/admin/user-requests" className="sidebar-link">
        User Requests
      </Link>
      <Link to="/admin/update-vehicle" className="sidebar-link">
        Update Vehicle Details
      </Link>
      <div className="sidebar-link exit-link" onClick={handleExit}>
        Exit
      </div>
    </div>
  );
};

export default Sidebar;