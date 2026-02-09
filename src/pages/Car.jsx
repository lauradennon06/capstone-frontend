import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getCarById } from "../api/cars";
import { useAuth } from "../auth/AuthContext";

// This component will render the Car image, make, model, year, price, color, milage, as well as a button to create an inquiry about the car, and an edit button for a logged in user to edit the car details
// Information will be fetched from the API
// The car ID will be a dynamic segment, the component will get the ID from useParams

export default function Car() {
  const { carId } = useParams();
  const { token } = useAuth();

  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCar() {
      try {
        const found = await getCarById(carId);

        if (!found) {
          setError("Car not found");
          return;
        }

        setCar(found);
      } catch (e) {
        setError(e.message);
      }
    }
    loadCar();
  }, [carId]);

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (!car) {
    return <p>Loading details</p>;
  }

  return (
    <div>
      <h1>
        {car.make} {car.model} ({car.year})
      </h1>
      <img src={car.photo_url} alt={`${car.make} ${car.model}`} />
      <p>Price: ${car.price}</p>
      <p>Color: {car.color}</p>
      <p>Mileage: {car.mileage} miles</p>
      <p>VIN: {car.vin}</p>
      {token && <button>Edit Car Details</button>}
      <Link to={`/cars/${carId}/inquire`}> Inquire About This Car</Link>
    </div>
  );
}
