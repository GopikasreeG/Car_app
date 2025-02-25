// src/components/UserSidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserSidebar.css';

const UserSidebar = () => {
  const navigate = useNavigate();

 // src/components/UserSidebar.jsx
const handleExit = () => {
  localStorage.removeItem('user'); // Clear user data
  navigate('/'); // Redirect to the login page
};
  return (
    <div className="user-sidebar">
      <Link to="/user/vehicle-list" className="user-sidebar-link">
        Vehicle List
      </Link>
      <Link to="/user/requests" className="user-sidebar-link">
        Requests
      </Link>
      <div className="user-sidebar-link exit-link" onClick={handleExit}>
        Exit
      </div>
    </div>
  );
};

export default UserSidebar;