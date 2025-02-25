// src/components/UserRequests.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './UserRequests.css';

const UserRequests = () => {
  const [requests, setRequests] = useState([]);

  // Fetch requests from Firestore
  const fetchRequests = async () => {
    const querySnapshot = await getDocs(collection(db, 'requests'));
    setRequests(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  // Fetch requests when the component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId, vehicleId) => {
    try {
      // Update the request status to "accepted"
      await updateDoc(doc(db, 'requests', requestId), {
        status: 'accepted',
      });

      // Remove the vehicle from the vehicles collection
      await deleteDoc(doc(db, 'vehicles', vehicleId));

      // Remove the request from the local state
      setRequests(requests.filter((request) => request.id !== requestId));

      alert('Request accepted and vehicle removed!');
    } catch (error) {
      console.error('Error accepting request: ', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      // Update the request status to "rejected"
      await updateDoc(doc(db, 'requests', requestId), {
        status: 'rejected',
      });

      // Remove the request from the local state
      setRequests(requests.filter((request) => request.id !== requestId));

      alert('Request rejected!');
    } catch (error) {
      console.error('Error rejecting request: ', error);
    }
  };

  return (
    <div className="user-requests">
      <h2>User Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Requested Vehicle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.vehicleModel}</td>
              <td>
              <div className="button-group">
                <button onClick={() => handleAccept(request.id, request.vehicleId)}>
                  Accept
                </button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserRequests;