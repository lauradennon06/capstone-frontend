//This compnent will be a link to a form to create a general inquiry, the form will have a text area for a name, a text area for phone number, and a text area for a message, as well as a submit button to submit the inquiry to the API, and a cancel button to go back to the home page, a success message will be displayed after the inquiry is submitted, and then the user will be redirected to the home page after a few seconds

import React, { useState } from "react";
import { useNavigate } from "react-router";
import { createInquiry } from "../../api/inquiries";

export default function GeneralInquiry() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createInquiry({
        name,
        email,
        number,
        message,
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (e) {
      setError(e.message);
    }
  }

  if (success) {
    return (
      <div>
        <h1>Thank You!</h1>
        <p style={{ color: "white" }}>
          Your inquiry has been submitted. You will be redirected to the home
          page shortly.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>General Inquiry</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Inquiry</button>
        <button type="button" onClick={() => navigate("/home")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
