// src/components/AddVehicle.jsx
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AddVehicle.css';

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    model: '',
    year: '',
    price: '',
  });

  const handleAddVehicle = async () => {
    if (!vehicle.model || !vehicle.year || !vehicle.price) {
      alert('Please fill all fields');
      return;
    }

    try {
      await addDoc(collection(db, 'vehicles'), vehicle);
      alert('Vehicle added successfully!');
      setVehicle({ model: '', year: '', price: '' });
    } catch (error) {
      console.error('Error adding vehicle: ', error);
    }
  };

  return (
    <div className="add-vehicle">
      <h2>Add Vehicle</h2>
      <div className="form-group">
        <label>Model:</label>
        <input
          type="text"
          value={vehicle.model}
          onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
          placeholder="Enter vehicle model"
        />
      </div>
      <div className="form-group">
        <label>Year:</label>
        <input
          type="text"
          value={vehicle.year}
          onChange={(e) => setVehicle({ ...vehicle, year: e.target.value })}
          placeholder="Enter vehicle year"
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="text"
          value={vehicle.price}
          onChange={(e) => setVehicle({ ...vehicle, price: e.target.value })}
          placeholder="Enter vehicle price"
        />
      </div>
      <button onClick={handleAddVehicle}>Add Vehicle</button>
    </div>
  );
};

export default AddVehicle;