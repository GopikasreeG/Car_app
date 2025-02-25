// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: '',
    price: ''
  });

  const handleAddCar = async () => {
    await addDoc(collection(db, 'cars'), carDetails);
    setCarDetails({ make: '', model: '', year: '', price: '' });
  };

  return (
    <div>
      <h2>Add Car</h2>
      <input
        type="text"
        placeholder="Make"
        value={carDetails.make}
        onChange={(e) => setCarDetails({ ...carDetails, make: e.target.value })}
      />
      <input
        type="text"
        placeholder="Model"
        value={carDetails.model}
        onChange={(e) => setCarDetails({ ...carDetails, model: e.target.value })}
      />
      <input
        type="text"
        placeholder="Year"
        value={carDetails.year}
        onChange={(e) => setCarDetails({ ...carDetails, year: e.target.value })}
      />
      <input
        type="text"
        placeholder="Price"
        value={carDetails.price}
        onChange={(e) => setCarDetails({ ...carDetails, price: e.target.value })}
      />
      <button onClick={handleAddCar}>Add Car</button>
    </div>
  );
};

export default AdminDashboard;