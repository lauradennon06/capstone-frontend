// This component will be used to delete a car from the database. The user will be able to click a button to delete the car, and then be redirected back to the cars page.

import React from "react";
import { useNavigate, useParams } from "react-router";
import { deleteCar } from "../../api/cars";
import { useAuth } from "../../auth/AuthContext";

export default function DeleteCar() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { token } = useAuth();

  const onDelete = async () => {
    try {
      await deleteCar(token, carId);
      alert("Car deleted successfully!");
      navigate("/cars");
    } catch (e) {
      console.error("Failed to delete car", e);
      alert(`Error: ${e.message}`);
    }
  };

  return (
    <>
      <h1>Delete Car</h1>
      <p>Are you sure you want to delete this car?</p>
      <button onClick={onDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/cars")}>No, Go Back</button>
    </>
  );
}
