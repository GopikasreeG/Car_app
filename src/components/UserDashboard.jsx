// src/components/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const UserDashboard = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, 'cars'));
      setCars(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCars();
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.make} {car.model} ({car.year}) - ${car.price}
            <button>Request to Purchase</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;