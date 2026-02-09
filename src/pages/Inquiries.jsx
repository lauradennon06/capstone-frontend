// This component will render a list of all the inquires in the database, each inquiry will have the name, phone number, message, and the car it is about
// The component will fetch the inquiries from the API on mount, and display them in a list
// Each inquiry will have a button to delete the inquiry, which will call the API to delete the inquiry from the database, and then remove it from the list
// The component will also have a button to go back to the home page
// The component anf the delete button are only visible to the logged in user, if the user is not logged in, it will display a message saying "Please log in to view your inquiries"

import React, { useState, useEffect } from "react";
import { getInquiries, deleteInquiry } from "../api/inquiries";
import { useNavigate } from "react-router";

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const data = await getInquiries();
        setInquiries(data);
      } catch (e) {
        setError(e.message);
      }
    }
    fetchInquiries();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteInquiry(id);
      setInquiries(inquiries.filter((inq) => inq.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      <h1>Your Inquiries</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {inquiries.length === 0 ? (
        <p>You have no inquiries.</p>
      ) : (
        <ul>
          {inquiries.map((inq) => (
            <li key={inq.id}>
              <p>
                <strong>Name:</strong> {inq.name}
              </p>
              <p>
                <strong>Phone:</strong> {inq.phone}
              </p>
              <p>
                <strong>Message:</strong> {inq.message}
              </p>
              <p>
                <strong>Car:</strong> {inq.car.make} {inq.car.model}
              </p>
              <button onClick={() => handleDelete(inq.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
