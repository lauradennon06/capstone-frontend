// This componenet will be used to delete a car from the database. It will also prompt the user to confirm the deletion before proceeding, and will display a success message after the car has been deleted.

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../auth/AuthContext";

const DeleteCar = ({ carId }) => {
  const { token } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/cars/${carId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to delete the car.");
        }
        alert("Car deleted successfully!");
        navigate("/cars"); // Redirect to the cars list page after deletion
      } catch (err) {
        setError(err.message);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete Car"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default DeleteCar;
