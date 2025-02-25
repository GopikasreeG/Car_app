// src/components/UpdateVehicle.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import './UpdateVehicle.css';

const UpdateVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      const querySnapshot = await getDocs(collection(db, 'vehicles'));
      setVehicles(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchVehicles();
  }, []);

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, 'vehicles', editingVehicle.id), {
        model: editingVehicle.model,
        year: editingVehicle.year,
        price: editingVehicle.price,
      });
      alert('Vehicle updated successfully!');
      setEditingVehicle(null);
      // Refresh the list
      const querySnapshot = await getDocs(collection(db, 'vehicles'));
      setVehicles(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error updating vehicle: ', error);
    }
  };

  return (
    <div className="update-vehicle">
      <h2>Update Vehicle Details</h2>
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
              <td>
                {editingVehicle?.id === vehicle.id ? (
                  <input
                    type="text"
                    value={editingVehicle.model}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, model: e.target.value })
                    }
                  />
                ) : (
                  vehicle.model
                )}
              </td>
              <td>
                {editingVehicle?.id === vehicle.id ? (
                  <input
                    type="text"
                    value={editingVehicle.year}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, year: e.target.value })
                    }
                  />
                ) : (
                  vehicle.year
                )}
              </td>
              <td>
                {editingVehicle?.id === vehicle.id ? (
                  <input
                    type="text"
                    value={editingVehicle.price}
                    onChange={(e) =>
                      setEditingVehicle({ ...editingVehicle, price: e.target.value })
                    }
                  />
                ) : (
                  vehicle.price
                )}
              </td>
              <td>
                {editingVehicle?.id === vehicle.id ? (
                  <button onClick={handleSave}>Save Changes</button>
                ) : (
                  <button onClick={() => handleEdit(vehicle)}>Make Changes</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateVehicle;