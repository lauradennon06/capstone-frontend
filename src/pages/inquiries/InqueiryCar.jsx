// This compnent will render the form to create an Inquiry about a specific car, the form will have a text area for a name, a text area for phone number, and a text area for a message, as well as a submit button to submit the inquiry to the API, and a cancel button to go back to the car details page
// The car ID will be a dynamic segment, the component will get the ID from useParams

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { createInquiry } from "../../api/inquiries";
import { getCarById } from "../../api/cars";

export default function InquiryCar() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchCar() {
      try {
        const found = await getCarById(carId);
        setCar(found);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchCar();
  }, [carId]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createInquiry({
        name,
        email,
        number,
        message,
        carId,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/cars");
      }, 2000);
    } catch (e) {
      setError(e.message);
    }
  }

  if (!car) {
    return <p>Loading car details...</p>;
  }

  if (success) {
    return (
      <div>
        <h1>Thank You!</h1>
        <p style={{ color: "white" }}>
          Your inquiry has been submitted successfully. Redirecting to cars
          page...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>
        Inquire About the {car.make} {car.model}
      </h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <textarea
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <textarea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <textarea
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Inquiry</button>
        <button type="button" onClick={() => navigate(`/cars/${carId}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
}
