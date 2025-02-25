// src/components/Request.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Requests.css';

const Request = () => {
  const [requests, setRequests] = useState([]);

  // Fetch requests from Firestore
  const fetchRequests = async () => {
    const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user details
    if (!user) return;

    const querySnapshot = await getDocs(collection(db, 'requests'));
    const userRequests = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((request) => request.userId === user.uid); // Filter requests for the logged-in user
    setRequests(userRequests);
  };

  // Fetch requests when the component mounts
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="request">
      <h2>Your Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle Model</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.vehicleModel}</td>
              <td
                style={{
                  color:
                    request.status === 'accepted'
                      ? 'green'
                      : request.status === 'rejected'
                      ? 'red'
                      : 'black',
                }}
              >
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Request;