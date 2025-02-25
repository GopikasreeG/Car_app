// src/components/UserVehicleList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import './UserVehicleList.css';

const UserVehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const querySnapshot = await getDocs(collection(db, 'vehicles'));
      setVehicles(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchVehicles();
  }, []);

  // src/components/UserVehicleList.jsx
const handleRequest = async (vehicleId) => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
  if (!user) {
    alert('Please log in to request a vehicle.');
    return;
  }

  try {
    // Add the request to the "requests" collection
    await setDoc(doc(db, 'requests', vehicleId), {
      userId: user.uid,
      name: user.displayName,
      email: user.email,
      vehicleId: vehicleId,
      vehicleModel: vehicles.find((v) => v.id === vehicleId).model,
      status: 'pending', // Initial status
    });
    alert('Request sent successfully!');
  } catch (error) {
    console.error('Error sending request: ', error);
  }
};
  return (
    <div className="user-vehicle-list">
      <h2>Vehicle List</h2>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>${vehicle.price}</td>
              <td>
                <button onClick={() => handleRequest(vehicle.id)}>Request</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserVehicleList;