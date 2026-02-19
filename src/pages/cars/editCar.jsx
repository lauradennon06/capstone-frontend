import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getCarById, updateCar } from "../../api/cars";
import { useAuth } from "../../auth/AuthContext";
import "./editCar.css";

export default function EditCar() {
  const { carId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [vin, setVin] = useState("");
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      try {
        const found = await getCarById(carId);
        if (!found) {
          setError("Car not found");
          return;
        }
        setCar(found);
        setMake(found.make);
        setModel(found.model);
        setYear(found.year);
        setPrice(found.price);
        setColor(found.color);
        setMileage(found.mileage);
        setVin(found.vin);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadCar();
  }, [carId]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await updateCar(token, carId, {
        make,
        model,
        year,
        price,
        color,
        mileage,
        vin,
      });
      navigate(`/cars/${carId}`);
    } catch (e) {
      setError(e.message);
    }
  }

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="editCarPage">
      <h1>Edit Car Details</h1>
      <form onSubmit={handleSubmit} className="editCarForm">
        <div>
          <label>Make:</label>
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Model:</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mileage:</label>
          <input
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            required
          />
        </div>
        <div>
          <label>VIN:</label>
          <input
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Photos:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setPhotos(Array.from(e.target.files))}
          />
        </div>
        <div className="formButtons">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate(`/cars/${carId}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
