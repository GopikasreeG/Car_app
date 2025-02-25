// src/pages/UserPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar';
import UserSidebar from '../components/UserSidebar';
import UserVehicleList from '../components/UserVehicleList';
import UserRequests from '../components/Requests';
import './UserPage.css';

const UserPage = () => {
  return (
    <div className="user-page">
      <UserNavbar />
      <div className="user-content">
        <UserSidebar />
        <div className="main-content">
          <Routes>
            <Route path="vehicle-list" element={<UserVehicleList />} />
            <Route path="requests" element={<UserRequests />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserPage;