// src/pages/AdminPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AddVehicle from '../components/AddVehicle';
import VehicleList from '../components/VehicleList';
import UserRequests from '../components/UserRequests';
import UpdateVehicle from '../components/UpdateVehicle';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="add-vehicle" element={<AddVehicle />} />
            <Route path="vehicle-list" element={<VehicleList />} />
            <Route path="user-requests" element={<UserRequests />} />
            <Route path="update-vehicle" element={<UpdateVehicle />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;