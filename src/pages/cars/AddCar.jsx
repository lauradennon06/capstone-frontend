// This componenet will be used to add a new car to the database. It will have a form with fields for the car's make, model, year, price, color, mileage, VIN, and photo URL. The form will also have a submit button that will send a POST request to the API to create a new car in the database. After the car is created, the user will be redirected to the car's detail page.

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/AuthContext";

const AddCar = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    color: "",
    mileage: "",
    vin: "",
    photo_url: "",
  });
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add the car.");
      }
      const newCar = await response.json();
      // If there are files to upload, send them to the /upload endpoint
      if (files.length > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append("carId", newCar.id);
        for (let file of files) {
          uploadFormData.append("files", file);
        }
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });
        if (!uploadResponse.ok) {
          throw new Error("Failed to upload car photos.");
        }
      }

      navigate(`/cars/${newCar.id}`); // Redirect to the new car's detail page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Add a New Car</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={formData.make}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
        />
        <input
          type="number"
          name="mileage"
          placeholder="Mileage"
          value={formData.mileage}
          onChange={handleChange}
        />
        <input
          type="text"
          name="vin"
          placeholder="VIN"
          value={formData.vin}
          onChange={handleChange}
        />
        <input
          type="file"
          name="files"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
