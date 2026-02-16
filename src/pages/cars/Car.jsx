import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getCarById, getCarPhotos } from "../../api/cars";
import { useAuth } from "../../auth/AuthContext";
import "./car.css";

// This component will render the Car image, make, model, year, price, color, milage, as well as a button to create an inquiry about the car, and an edit button for a logged in user to edit the car details
// Information will be fetched from the API
// The car ID will be a dynamic segment, the component will get the ID from useParams

const API = import.meta.env.VITE_API;

export default function Car() {
  const { carId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [photos, setPhotos] = useState([]);
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
        const carPhotos = await getCarPhotos(carId);
        console.log("Car photos fetched:", carPhotos);
        setPhotos(carPhotos);
      } catch (e) {
        console.error("Error loading car:", e);
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
    <div className="carDetails">
      <h1>
        {car.make} {car.model} ({car.year})
      </h1>
      {photos.length > 0 ? (
        <div>
          {photos.map((photo, index) => (
            <img
              key={photo.id}
              src={
                photo.file_path.startsWith("http")
                  ? photo.file_path
                  : `${API}/${photo.file_path}`
              }
              alt={`${car.make} ${car.model}`}
              width="400"
              height="400"
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
      ) : (
        <img
          src={car.photo_url}
          alt={`${car.make} ${car.model}`}
          width="400"
          height="400"
          style={{ objectFit: "cover" }}
        />
      )}

      <p>Price: ${car.price}</p>
      <p>Color: {car.color}</p>
      <p>Mileage: {car.mileage} miles</p>
      <p>VIN: {car.vin}</p>
      {token && (
        <button onClick={() => navigate(`/cars/${carId}/edit`)}>
          Edit Car Details
        </button>
      )}
      {!token && (
        <Link to={`/cars/${carId}/inquire`} className="inquire">
          {" "}
          Inquire About This Car
        </Link>
      )}
    </div>
  );
}
